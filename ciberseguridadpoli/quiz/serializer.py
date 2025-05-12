from rest_framework import serializers
from .models import Quiz, Question, Answer
class QuizSerializer(serializers.ModelSerializer):
  class Meta:
    model = Quiz
    fields = ('id','name','description')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
      model = Question
      fields = ('id','quiz','statement','points')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
      model = Answer
      fields = ('id','question','answer','is_correct')