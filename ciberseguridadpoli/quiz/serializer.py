from rest_framework import serializers
from .models import Quiz
class QuizSerializaer(serializers.ModelSerializer):
  class Meta:
    model = Quiz
    fields = ('name','description')