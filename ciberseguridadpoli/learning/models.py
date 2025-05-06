from django.db import models

# Create your models here.
class Section(models.Model):
  section_number = models.IntegerField()
  description = models.CharField(max_length=500)
  #completed = models.BooleanField(default=False)