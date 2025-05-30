from django.db import models

from learning.models import Lecture
from signup.models import User
# Create your models here.

class Quiz(models.Model):
  name = models.CharField(max_length=40)
  description = models.CharField(max_length=150)
  lecture = models.ForeignKey(Lecture,on_delete=models.CASCADE)

  def __str__(self):
    return self.name

  class Meta:
    verbose_name_plural = "quizzes"

class Question(models.Model):
  statement = models.CharField(max_length=1000,blank=False)
  points = models.IntegerField(blank=False)
  quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
  def __str__(self):
    return self.statement

class Answer(models.Model):
  answer = models.CharField(max_length=1000,blank=False)
  is_correct = models.BooleanField(blank=False)
  question= models.ForeignKey(Question, on_delete=models.CASCADE)
  def __str__(self):
    return self.answer
  
class AvailableQuiz(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
  is_available = models.BooleanField(blank=False,default=False)

  def __str__(self):
    return "{}, {}".format(self.user,self.quiz)

  class Meta:
    verbose_name_plural = "available quizzes"

class QuizCompletion(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
  score = models.FloatField(blank=True,null=True)
  attempt_date = models.DateTimeField(auto_now=True)

  def __str__(self):
    return "{}, {} , {}".format(self.user,self.quiz,self.score)
  
