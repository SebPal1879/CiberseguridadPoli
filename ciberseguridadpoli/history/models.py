from django.db import models
from signup.models import History
from quiz.models import QuizCompletion
# Create your models here.

class HistoryQuizCompletion(models.Model):
  id_history = models.ForeignKey(History,on_delete=models.CASCADE)
  id_attempt = models.ForeignKey(QuizCompletion,on_delete=models.CASCADE)

