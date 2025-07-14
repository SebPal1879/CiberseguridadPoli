from collections import defaultdict

from django.http import HttpResponse
from django.contrib.auth.models import User
from django.db.models import Subquery
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializer import QuizSerializer,QuestionSerializer,AnswerSerializer, AvailableQuizSerializer, QuizCompletionSerializer
from .models import Quiz,Question, Answer, AvailableQuiz, QuizCompletion
#from learning.models import LectureAvailabilityAndCompletion

      
# Create your views here.
class QuizView(viewsets.ModelViewSet):
  serializer_class = QuizSerializer
  queryset = Quiz.objects.filter(pk=1)
  print(queryset)

class FetchQuizAPIView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]
  def get(self,request, id):
    quiz = Quiz.objects.get(pk=id)
    user = User.objects.get(pk=request.user.id)
    try:
      quiz_availability = AvailableQuiz.objects.get(user=user,quiz=quiz)
    except ObjectDoesNotExist:
      return Response({"Error": "No se ha registrado la disponibilidad del desafío para este usuario"},status=status.HTTP_404_NOT_FOUND)
    if not quiz_availability.is_available:
      return Response({"Error": "El quiz no está disponible para este usuario"},status=status.HTTP_400_BAD_REQUEST)
    questions = Question.objects.filter(quiz=quiz)
    answers = Answer.objects.filter(question__in=Subquery(questions.values('id')))

    quiz_serializer = QuizSerializer(quiz)
    question_serializer = QuestionSerializer(questions, many=True)
    answer_serializer = AnswerSerializer(answers, many=True)

    returned_array = array_constructor(question_serializer.data,answer_serializer.data)
    #print(returned_array)
    return Response([returned_array,quiz_serializer.data], status=status.HTTP_200_OK)
  
class AvailableQuizzesView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request):
    user = User.objects.get(pk=request.user.id)
    quiz_availability = AvailableQuiz.objects.filter(user=user,is_available=True)
    if not quiz_availability.exists():
      return Response({"Error":"Parece que no se ha registrado la disponibilidad de ningún desafío para este usuario."}, status=status.HTTP_404_NOT_FOUND)
    #quiz_availability_serializer = AvailableQuizSerializer(quiz_availability,many=True)
    user_quizzes = Quiz.objects.filter(id__in=Subquery(quiz_availability.values('quiz')))
    user_quizzes_serializer = QuizSerializer(user_quizzes,many=True)
    return Response(user_quizzes_serializer.data,status=status.HTTP_200_OK)

class QuizCompletionView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]
  def post(self,request,id):
    user = User.objects.get(pk=request.user.id)
    quiz = Quiz.objects.get(pk=id)
    score = request.data.get('score')

    try: 
      # Valida si el quiz está disponible para el usuario
      quiz_availability = AvailableQuiz.objects.get(user=user,quiz=quiz)
      if not quiz_availability.is_available:
        return Response({"Error": "Este quiz no está disponible para el usuario"}, status=status.HTTP_400_BAD_REQUEST)
      
      quiz_completion = QuizCompletion.objects.create(user=user,quiz=quiz,score=score)
      quiz_completion_serializer = QuizCompletionSerializer(quiz_completion)
      return Response(quiz_completion_serializer.data, status=status.HTTP_201_CREATED)    
      
    # Retorna error si no hay disponibilidad registrada para el usuario.
    except ObjectDoesNotExist:
      return Response({"Error": "No se ha encontrado registro de disponibilidad del quiz para el usuario."}, status=status.HTTP_404_NOT_FOUND)
    
class QuizHistoryView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]
  def get(self,request):
    user = User.objects.get(pk=request.user.id)
    completed_quizzes = QuizCompletion.objects.filter(user=user)
    if not completed_quizzes:
      return Response({"Error": "No se ha encontrado ningún quiz para el usuario"},status=status.HTTP_404_NOT_FOUND)
    completed_quizzes_serializer = QuizCompletionSerializer(completed_quizzes,many=True)
    return Response(completed_quizzes_serializer.data,status=status.HTTP_200_OK)
  
def Lunerview(request):
  a = Quiz.objects.get(pk=2)
  return HttpResponse(a)

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