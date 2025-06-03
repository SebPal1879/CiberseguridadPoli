from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Subquery
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from learning.models import LectureAvailabilityAndCompletion, Section, Lecture, LectureContent
from learning.serializer import AvailabilityCompletionSerializer, SectionSerializer, LectureSerializer, LectureContentSerializer
from quiz.models import AvailableQuiz, Quiz, Question, Answer
# Create your views here.

# Para trabajar después: al crear un nuevo contenido, no se crea su registro de disponibilidad todavía
def SyncLectureUserAvailability():
  pass

# class AddSections(APIView):

#   def post(self,request):

#     lectures_contents = request.data
#     for lecture_content in lectures_contents:
#         lecture = Lecture.objects.get(pk=lecture_content["lecture"])
#         xorizo = LectureContent.objects.create(content_in_lecture_number=lecture_content["content_in_lecture_number"],content=lecture_content["content"],lecture=lecture)
#         xorizo.save()

#     return Response({"a" : "Se subieron a los a"})
#     # sections = request.data
#     # for section in sections:
#     #   new_section = Section.objects.create(section_number=section["section_number"],name=section["name"], description=section["description"])
#     # return Response({"Mensaje" : "Se subieron todos los contenidos"})


class AddSections(APIView):

  def post(self,request):
    answers = request.data    
    for answer in answers:
      question = Question.objects.get(pk=answer["question"])
      Answer.objects.create(answer=answer["answer"],is_correct=answer["is_correct"],question=question)    
    # questions = request.data    
    # for question in questions:
    #   quiz = Quiz.objects.get(pk=question["quiz"])
    #   question = Question.objects.create(statement=question["statement"],points=question["points"],quiz=quiz)

    # quizzes = request.data
    # for quiz in quizzes:
    #     lecture = Lecture.objects.get(pk=quiz["lecture"])
    #     Quiz.objects.create(name=quiz["name"],description=quiz["description"],lecture=lecture)

    return Response({"a" : "Se subieron a los a"})
    # sections = request.data
    # for section in sections:
    #   new_section = Section.objects.create(section_number=section["section_number"],name=section["name"], description=section["description"])
    # return Response({"Mensaje" : "Se subieron todos los contenidos"})

class SectionsView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request):
    available_sections = list()
    for section in Section.objects.all().order_by('section_number'):
      lecture = Lecture.objects.filter(section=section).order_by('lecture_in_section_number').first()
      try:
        user_lecture = LectureAvailabilityAndCompletion.objects.get(user=request.user.id, lecture=lecture)
      except:
        return Response({"Error": "No se encontró información para el usuario en cuestión."},status=status.HTTP_404_NOT_FOUND)
      if user_lecture.is_available:
        available_sections.append(section)
    
    section_serializer = SectionSerializer(available_sections,many=True)# Los serializers pueden tomar tanto querysets como arreglos

    return Response(section_serializer.data, status=status.HTTP_200_OK)

class LecturesView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request,section_id):
    lectures = Lecture.objects.filter(section=section_id).order_by('lecture_in_section_number')
    lecture_serializer = LectureSerializer(lectures,many=True)
    lecture_information = list()
    for lecture in lecture_serializer.data:
      availability = return_availability(user=request.user.id,lecture=lecture['id'])
      lecture["available"] = availability.is_available
      lecture["completed"] = availability.is_completed
      lecture_information.append(lecture)
    if all(not lecture["available"] for lecture in lecture_information):
      return Response({"Error":"Parece que esta sección no está disponible"},status=status.HTTP_404_NOT_FOUND)
    return Response(lecture_information,status=status.HTTP_200_OK)
  
class LectureContentView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request,section_id,lecture_id):
    user = User.objects.get(pk=request.user.id)
    print(user.username)
    try:
      lecture = Lecture.objects.get(pk=lecture_id)
    except ObjectDoesNotExist:
      return Response({"Error":"No se encontró nada con esta lección"},status=status.HTTP_404_NOT_FOUND)
    
    # Valida si en el URL, la lección está asociada a la sección
    if section_id != lecture.section.pk:
      return Response({"Error":"Parece que esta lección no pertenece a la sección referenciada"},status=status.HTTP_404_NOT_FOUND)
    
    # Valida si esta lección está disponible para el usuario
    try:
      availability = return_availability(request.user.id,lecture_id)
    except ObjectDoesNotExist:
      return Response({"Error":"No se ha registrado la disponibilidad de esta lección para este usuario."},status=status.HTTP_404_NOT_FOUND)
    if not availability.is_available:
      return Response({"Error":"Parece que esta lección no está disponible"},status=status.HTTP_404_NOT_FOUND)
        
    # Valida si la lección tiene contenido
    lecture_contents = LectureContent.objects.filter(lecture=lecture).order_by('content_in_lecture_number')
    if not lecture_contents.exists():
      return Response({"Error":"No se encontró ningún contenido en esta sección."},status=status.HTTP_404_NOT_FOUND)
    
    lecture_contents_serializer = LectureContentSerializer(lecture_contents,many=True)
    lecture_serializer = LectureSerializer(lecture)
    availability_serializer = AvailabilityCompletionSerializer(availability)
    return Response([lecture_contents_serializer.data, lecture_serializer.data,availability_serializer.data],status=status.HTTP_200_OK)
  

  def post(self,request,section_id,lecture_id):
    user = User.objects.get(pk=request.user.id)
    lecture = Lecture.objects.get(pk=lecture_id)
    try:
      lecture_availability_completion = return_availability(user=user,lecture=lecture)
    except ObjectDoesNotExist:
      return Response({"Error": "No se ha registrado la disponibilidad de esta lección para este usuario"},status=status.HTTP_404_NOT_FOUND)
    
    # Validar que la lección si esté disponible
    if not lecture_availability_completion.is_available:
      return Response({"Error": "No se puede seguir con la completación de la lección"}, status=status.HTTP_400_BAD_REQUEST)
    
    lecture_availability_completion.is_completed = True
    lecture_availability_completion.save()

    try:
      related_quizzes = Quiz.objects.filter(lecture=lecture)
      quiz_availability = AvailableQuiz.objects.filter(user=user,quiz__in=Subquery(related_quizzes.values('id'))).update(is_available=True)
    except ObjectDoesNotExist:
      pass
    try:
      next_lecture = Lecture.objects.get(lecture_in_section_number=lecture.lecture_in_section_number + 1,section = lecture.section)
      next_lecture_availability = LectureAvailabilityAndCompletion.objects.get(lecture=next_lecture,user=user)
      next_lecture_availability.is_available = True
      next_lecture_availability.save()
    except ObjectDoesNotExist:
      try:
        next_section = Section.objects.get(section_number=lecture.section.section_number + 1)
        first_nextsect_lecture = Lecture.objects.filter(section=next_section).order_by("lecture_in_section_number").first()
        next_sect_availability = LectureAvailabilityAndCompletion.objects.get(user=user,lecture=first_nextsect_lecture)
        next_sect_availability.is_available = True
        next_sect_availability.save()
      except ObjectDoesNotExist:
        print("No se encontró una siguiente sección")

    return Response({"Mensaje" : "Se completó la lección exitosamente"},status=status.HTTP_200_OK)

def return_availability(user,lecture):
  return LectureAvailabilityAndCompletion.objects.get(user=user, lecture=lecture)
