from django.db import models
from signup.models import User

# Create your models here.
class Section(models.Model):
  section_number = models.IntegerField(blank=False,default=0,null=False)
  name = models.CharField(blank=True)
  description = models.CharField(max_length=500)
  #completed = models.BooleanField(default=False)
  def __str__(self):
    return self.description

class Lecture(models.Model):
  lecture_in_section_number = models.IntegerField(blank=False,default=0,null=False)
  name = models.CharField(max_length=30,blank=False)
  description = models.CharField(max_length=500,null=False,blank=False)
  section = models.ForeignKey(Section,on_delete=models.CASCADE)
  def __str__(self):
    return self.name

class LectureContent(models.Model):
  content_in_lecture_number = models.IntegerField(blank=False,default=0,null=False)
  content = models.CharField(max_length=1000)
  image_path = models.ImageField(blank=True,null=True)
  lecture = models.ForeignKey(Lecture,on_delete=models.CASCADE)
  def __str__(self):
    return f"{self.id}"

class LectureAvailabilityAndCompletion(models.Model):
  is_available = models.BooleanField(blank=False, default=False)
  is_completed = models.BooleanField(blank=False, default=False)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  lecture = models.ForeignKey(Lecture,on_delete=models.CASCADE)
  def __str__(self):
    return "{}, {}, {}, {}".format(self.user,self.lecture,self.is_available,self.is_completed)