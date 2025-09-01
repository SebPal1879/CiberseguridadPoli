from rest_framework import serializers
from .models import Quiz, Question, Answer, AvailableQuiz, QuizCompletion
class QuizSerializer(serializers.ModelSerializer):
  class Meta:
    model = Quiz
    fields = ('id','name','description','lecture')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
      model = Question
      fields = ('id','quiz','statement','points')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
      model = Answer
      fields = ('id','question','answer','is_correct')

class AvailableQuizSerializer(serializers.ModelSerializer):
   class Meta:
      model = AvailableQuiz
      fields = ('user','quiz','is_available')

class QuizCompletionSerializer(serializers.ModelSerializer):
   attempt_date = serializers.DateTimeField(format="%Y-%m-%d")
   quiz = serializers.StringRelatedField()


   class Meta:
      model = QuizCompletion
      fields = ('id','quiz','score','attempt_date')