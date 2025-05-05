from django.db import models

# Create your models here.

class Quiz(models.Model):
  name = models.CharField(max_length=40)
  description = models.CharField(max_length=150)
  Lecture_id_lecture =models.ForeignKey()