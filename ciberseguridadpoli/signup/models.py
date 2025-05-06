import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  profile_picture = models.ImageField(upload_to="./prueba",blank=True)

class History(models.Model):
  id_history = models.UUIDField(default=uuid.uuid4,editable=False,primary_key=True)
  User_id_user = models.OneToOneField(User, on_delete=models.CASCADE,blank=True)
  class Meta:
    verbose_name_plural = "histories"
  
