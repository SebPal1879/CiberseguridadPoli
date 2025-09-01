from django.core.exceptions import ObjectDoesNotExist
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User

from .models import Quiz, AvailableQuiz
from learning.models import LectureAvailabilityAndCompletion

@receiver(post_save, sender=Quiz)
def update_user_quiz_availability(sender,instance,created,**kwargs):
  if created:
    users = User.objects.all()
    for user in users:
      try:
        lecture_availability = LectureAvailabilityAndCompletion.objects.get(user=user,lecture=instance.lecture)
        if lecture_availability.is_completed:      
          AvailableQuiz.objects.create(user=user,quiz=instance,is_available=True)
          print("Lección completada: quiz disponible")
        else:
          AvailableQuiz.objects.create(user=user,quiz=instance)
          print("Lección no completada: quiz no disponible")
        print("user")
      except ObjectDoesNotExist:
        print("Disponibilidad de lección no registrada; no se guarda disponibilidad de quiz")
        continue