from django.db import models
from signup.models import User

# Create your models here.
class Section(models.Model):
  section_number = models.IntegerField(blank=False)
  description = models.CharField(max_length=500)
  #completed = models.BooleanField(default=False)

class Lecture(models.Model):
  name = models.CharField(max_length=30,blank=False)
  section_id = models.ForeignKey(Section,on_delete=models.CASCADE)

class LectureContent():
  content_path = models.CharField(max_length=100)
  image_path = models.ImageField(blank=True,null=True)
  lecture_id = models.ForeignKey(Lecture,on_delete=models.CASCADE)

class LectureAvailabilityAndCompletion():
  is_available = models.BooleanField(blank=False, default=False)
  is_completed = models.BooleanField(blank=False, default=False)
  id_user = models.ForeignKey(User,on_delete=models.CASCADE)
  id_lecture = models.ForeignKey(Lecture,on_delete=models.CASCADE)