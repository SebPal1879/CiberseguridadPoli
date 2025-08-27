from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Ticket(models.Model):
  name = models.CharField(max_length=120,null=False)
  email = models.EmailField(null=False)
  subject = models.CharField(max_length=60,null=False)
  telephone_number = models.CharField(max_length=20,null=True, default=None)
  message = models.CharField(max_length=600)

  user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
