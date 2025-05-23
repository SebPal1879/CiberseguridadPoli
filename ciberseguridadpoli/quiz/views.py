from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import QuizSerializer,QuestionSerializer,AnswerSerializer
from .models import Quiz,Question,Answer
from django.http import HttpResponse
from django.db.models import Subquery
from collections import defaultdict

def array_constructor(questions,answers):
  questions_array = []
  answers_by_question = defaultdict(list)
  for answer in answers:
    answers_by_question[answer["question"]].append(answer)

  for question in questions:
    question_element = dict(question)
    question_element["answers"] = answers_by_question.get(question["id"],[])
    questions_array.append(question_element)

  return questions_array
      
# Create your views here.
class QuizView(viewsets.ModelViewSet):
  serializer_class = QuizSerializer
  queryset = Quiz.objects.filter(pk=1)
  print(queryset)

class SearchQuizAPIView(APIView):
  def post(self,request):
    quiz_id = request.data.get('id')

    quiz = Quiz.objects.get(pk=quiz_id)
    questions = Question.objects.filter(quiz=quiz_id)
    answers = Answer.objects.filter(question__in=Subquery(questions.values('id')))

    quiz_serializer = QuizSerializer(quiz)
    question_serializer = QuestionSerializer(questions, many=True)
    answer_serializer = AnswerSerializer(answers, many=True)

    returned_array = array_constructor(question_serializer.data,answer_serializer.data)
    #print(returned_array)
    return Response(returned_array, status=status.HTTP_200_OK)

def Lunerview(request):
  a = Quiz.objects.get(pk=2)
  return HttpResponse(a)