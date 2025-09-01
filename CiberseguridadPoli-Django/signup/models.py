import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  profile_picture = models.ImageField(upload_to="profile_pictures/",blank=True)
  telephone_number = models.CharField(max_length=20,null=True,blank=True, default=None)
  program = models.CharField(max_length=40,default="Ninguno")
  level = models.IntegerField(default=1)
  def __str__(self):
    return "{}, {}, {}, {}".format(self.user, self.telephone_number,self.program,self.level)
  

