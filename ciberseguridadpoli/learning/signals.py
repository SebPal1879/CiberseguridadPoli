from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models import Subquery
from django.db.models.signals import post_save
from django.contrib.auth.models import User

from .models import LectureAvailabilityAndCompletion, Lecture, Section

# Se debe crear un registro de disponibilidad por cada lección para cada usuario. Si recién se creó, se debe determinar si está disponible por cada usuario.
@receiver(post_save, sender=Lecture)
def update_user_lecture_availability(sender,instance,created,**kwargs):
  if created:
    # Toma todos los usuarios
    users = User.objects.all()
    try:
      # Como se acaba de crear una lección, busca la lección anterior; de esta manera se determina si la nueva sección debe estar disponible
      previous_lecture = Lecture.objects.get(section=instance.section,lecture_in_section_number=instance.lecture_in_section_number - 1)
    except:
      # Si no existe una previa lección en la misma sección, es porque esta es la primera lección de dicha sección. De esta manera, la lección anterior será la última de la sección anterior.
      # Por ende, para determinar disponibilidad, se debe buscar la última lección de la sección anterior para determinar si la nueva lección está disponible.
      try:
        previous_section = Section.objects.get(section_number=instance.section - 1)
        try:
          previous_lecture = Lecture.objects.filter(section=previous_section).order_by("lecture_in_section_number").last()
        # Si hay sección anterior, pero no hay lección, entonces no habrá disponibilidad inmediata para esta lección.
        except:
          for user in users:
            LectureAvailabilityAndCompletion.objects.create(section_number=instance.section,user=user)
          return
          
      # Si no hay sección anterior, entonces vuelve la lección disponible para todos los usuarios.
      except:
        for user in users:
          LectureAvailabilityAndCompletion.objects.create(section_number=instance.section,user=user,is_available=True)
        return

    # Para cuando hay lección anterior, se valida la disponibilidad de la misma, y según eso, se crea la disponibilidad de la nueva sección.
    for user in users:
      try:
        prev_lecture_availability = LectureAvailabilityAndCompletion.objects.get(user=user,lecture=previous_lecture)
        if prev_lecture_availability.is_completed:      
          LectureAvailabilityAndCompletion.objects.create(user=user,lecture=instance,is_available=True)
          print("Lección anterior completada: nueva lección disponible")
        else:
          LectureAvailabilityAndCompletion.objects.create(user=user,lecture=instance)
          print("Lección anterior no completada: nueva lección no disponible")
        print("user")
      except ObjectDoesNotExist:
        print("Disponibilidad de lección anterior no registrada; no se guarda disponibilidad de la nueva lección")
        continue