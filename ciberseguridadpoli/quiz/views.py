from rest_framework import viewsets
from .serializer import QuizSerializer
from .models import Quiz
from django.http import HttpResponse

# Create your views here.
class QuizView(viewsets.ModelViewSet):
  serializer_class = QuizSerializer
  queryset = Quiz.objects.get(pk=2)
  print(queryset)

def Lunerview(request):
  a = Quiz.objects.get(pk=2)
  return HttpResponse(a)