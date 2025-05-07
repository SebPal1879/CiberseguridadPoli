from django.shortcuts import render
from rest_framework import viewsets
from .serializer import QuizSerializaer
from .models import Quiz
# Create your views here.
class QuizView(viewsets.ModelViewSet):
  serializer_class = QuizSerializaer
  queryset = Quiz.objects.all()