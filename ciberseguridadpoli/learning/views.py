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

class AddSections(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated, IsAdminUser]
  def post(self,request):
    sections = request.data    
    for section in sections:
      Section.objects.create(section_number=section["section_number"],name=section["name"],description=section["description"])    
    return Response(data={"Exitoso" : "Se subieron las secciones a la base de dato"},status=status.HTTP_201_CREATED)

class AddLectures(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated, IsAdminUser]
  def post(self,request):
    lectures = request.data    
    for lecture  in lectures:
      try:
        section = Section.objects.get(pk=lecture["section"])
      except ObjectDoesNotExist:
        return Response(data={"Error" : "No se encontró una section dada por una lecture."}, status=status.HTTP_400_BAD_REQUEST)
      Lecture.objects.create(lecture_in_section_number=lecture["lecture_in_section_number"],name=lecture["name"],description=lecture["description"],section=section)    
    return Response(data={"Exitoso" : "Se subieron los datos"},status=status.HTTP_201_CREATED)

class AddContents(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated, IsAdminUser]
  def post(self,request):
    contents = request.data    
    for content  in contents:
      try:
        lecture = Lecture.objects.get(pk=content["lecture"])
      except ObjectDoesNotExist:
        return Response(data={"Error" : "No se encontró una lecture dada por un content."}, status=status.HTTP_400_BAD_REQUEST)
      LectureContent.objects.create(content_in_lecture_number=content["content_in_lecture_number"],content=content["content"],lecture=lecture)    
    return Response(data={"Exitoso" : "Se subieron los datos"},status=status.HTTP_201_CREATED)

class SectionsView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request):
    available_sections = list()
    user = User.objects.get(pk=request.user.id)
    for section in Section.objects.all().order_by('section_number'):
      lecture = Lecture.objects.filter(section=section).order_by('lecture_in_section_number').first()
      try:
        user_lecture = LectureAvailabilityAndCompletion.objects.get(user=user, lecture=lecture)
      except:
        return Response(data={"Error": "No se encontró información para el usuario en cuestión."},status=status.HTTP_404_NOT_FOUND)
      if user_lecture.is_available:
        available_sections.append(section)
    
    section_serializer = SectionSerializer(available_sections,many=True)# Los serializers pueden tomar tanto querysets como arreglos
    return Response(data=section_serializer.data, status=status.HTTP_200_OK)

# Vista para mostrar las lecciones dentro de una sección. Recibe un ID de sección como argumento y trae las lectures asociadas.
class LecturesInSectionView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request,section_id):
    lectures = Lecture.objects.filter(section=section_id).order_by('lecture_in_section_number')
    user = User.objects.get(pk=request.user.id)

    lecture_serializer = LectureSerializer(lectures,many=True)
    lectures = list()
    # Busca lectures y los agrega a una lista si están disponibles.
    for lecture in lecture_serializer.data:
      availability = return_lecture_availability(user=user,lecture=lecture['id'])
      lecture["available"] = availability.is_available
      lecture["completed"] = availability.is_completed
      if availability.is_available:
        lectures.append(lecture)
    if not lectures:
      return Response(data={"Error":"Parece que esta sección no está disponible"},status=status.HTTP_404_NOT_FOUND)
    return Response(data=lectures,status=status.HTTP_200_OK)
  
# Vista para traer los contenidos de una lecture. Recibe un ID de lección como argumento y trae los contenidos asociados a aquel lecture.
class LectureContentsView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request,section_id,lecture_id):
    user = User.objects.get(pk=request.user.id)
    try:
      lecture = Lecture.objects.get(pk=lecture_id)
    except ObjectDoesNotExist:
      return Response(data={"Error":"No se encontró nada con esta lección"},status=status.HTTP_404_NOT_FOUND)
    
    # Valida si en el URL, la lección está asociada a la sección
    if section_id != lecture.section.pk:
      return Response(data={"Error":"Parece que esta lección no pertenece a la sección referenciada"},status=status.HTTP_404_NOT_FOUND)
    
    # Valida si esta lección está disponible para el usuario
    try:
      availability = return_lecture_availability(user,lecture)
    except ObjectDoesNotExist:
      return Response(data={"Error":"No se ha registrado la disponibilidad de esta lección para este usuario."},status=status.HTTP_404_NOT_FOUND)
    if not availability.is_available:
      return Response(data={"Error":"Parece que esta lección no está disponible"},status=status.HTTP_404_NOT_FOUND)
        
    # Valida si la lección tiene contenido
    lecture_contents = LectureContent.objects.filter(lecture=lecture).order_by('content_in_lecture_number')
    if not lecture_contents.exists():
      return Response(data={"Error":"No se encontró ningún contenido en esta sección."},status=status.HTTP_404_NOT_FOUND)
    
    lecture_contents_serializer = LectureContentSerializer(lecture_contents,many=True)
    lecture_serializer = LectureSerializer(lecture)
    availability_serializer = AvailabilityCompletionSerializer(availability)
    return Response(data=[lecture_contents_serializer.data, lecture_serializer.data,availability_serializer.data],status=status.HTTP_200_OK)
  

  def post(self,request,section_id,lecture_id):
    user = User.objects.get(pk=request.user.id)
    lecture = Lecture.objects.get(pk=lecture_id)
    try:
      lecture_availability_completion = return_lecture_availability(user=user,lecture=lecture)
    except ObjectDoesNotExist:
      return Response(data={"Error": "No se ha registrado la disponibilidad de esta lección para este usuario"},status=status.HTTP_404_NOT_FOUND)
    
    # Validar que la lección si esté disponible
    if not lecture_availability_completion.is_available:
      return Response(data={"Error": "No se puede seguir con la completación de la lección"}, status=status.HTTP_400_BAD_REQUEST)
    
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

    return Response(data={"Mensaje" : "Se completó la lección exitosamente"},status=status.HTTP_200_OK)

def return_lecture_availability(user,lecture):
  return LectureAvailabilityAndCompletion.objects.get(user=user, lecture=lecture)
