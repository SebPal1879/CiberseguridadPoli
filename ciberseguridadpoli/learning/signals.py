from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User

from .models import LectureAvailabilityAndCompletion, Lecture

@receiver(post_save, sender=Lecture)
def update_user_lecture_availability(sender,instance,created,**kwargs):
  if created:
    users = User.objects.all()
    previous_lecture = Lecture.objects.get(section=instance.section,lecture_in_section_number=instance.lecture_in_section_number - 1)
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