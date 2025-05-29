from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Subquery
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from learning.models import LectureAvailabilityAndCompletion, Section, Lecture, LectureContent
from learning.serializer import AvailabilityCompletionSerializer, SectionSerializer, LectureSerializer, LectureContentSerializer
# Create your views here.

#Para trabajar después: al crear un nuevo contenido, no se crea su registro de disponibilidad todavía
def SyncLectureUserAvailability():
  pass


class SectionsView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request):
    
    available_sections = list()
    for section in Section.objects.all().order_by('section_number'):
      lecture = Lecture.objects.filter(section_id=section).order_by('lecture_in_section_number').first()
      try:
        user_lecture = LectureAvailabilityAndCompletion.objects.get(user_id=request.user.id, lecture_id=lecture)
      except:
        return Response({"Error": "No se encontró información para el usuario en cuestión."},status=status.HTTP_404_NOT_FOUND)
      if user_lecture.is_available:
        available_sections.append(section)
    
    section_serializer = SectionSerializer(available_sections,many=True)#Los serializers pueden tomar tanto querysets como arreglos

    return Response(section_serializer.data, status=status.HTTP_200_OK)





    available_lectures = LectureAvailabilityAndCompletion.objects.filter(id_user=request.user.id)
    available_lectures_serializer = AvailabilityCompletionSerializer(available_lectures,many=True)
    
    return Response(available_lectures_serializer.data, status=status.HTTP_201_CREATED)
    # token = Token.objects.get(key=request.data)
    # user = token.user

class LecturesView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request,section_id):
    lectures = Lecture.objects.filter(section_id=section_id).order_by('lecture_in_section_number')
    lecture_serializer = LectureSerializer(lectures,many=True)
    lecture_information = list()
    for lecture in lecture_serializer.data:
      availability = return_availability(user_id=request.user.id,lecture_id=lecture['id'])
      lecture["available"] = availability.is_available
      lecture["completed"] = availability.is_completed
      lecture_information.append(lecture)
    if all(not lecture["available"] for lecture in lecture_information):
      return Response({"Error":"Parece que esta sección no está disponible"},status=status.HTTP_404_NOT_FOUND)
    return Response({"Encontrado": lecture_information},status=status.HTTP_200_OK)
  
class LectureContentView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request,section_id,lecture_id):
    try:
      lecture = Lecture.objects.get(pk=lecture_id)
    except ObjectDoesNotExist:
      return Response({"Error":"No se encontró nada con esta lección"},status=status.HTTP_404_NOT_FOUND)
    
    # Valida si en el URL, la lección está asociada a la sección
    if section_id != lecture.section_id.pk:
      return Response({"Error":"Parece que esta lección no pertenece a la sección referenciada"},status=status.HTTP_404_NOT_FOUND)
    
    # Valida si esta lección está disponible para el usuario
    availability = return_availability(request.user.id,lecture_id)
    if not availability.is_available:
      return Response({"Error":"Parece que esta lección no está disponible"},status=status.HTTP_404_NOT_FOUND)
        
    # Valida si la lección tiene contenido
    lecture_contents = LectureContent.objects.filter(lecture_id=lecture).order_by('content_in_lecture_number')
    if not lecture_contents.exists():
      return Response({"Error":"No se encontró ningún contenido en esta sección."},status=status.HTTP_404_NOT_FOUND)
    
    lecture_contents_serializer = LectureContentSerializer(lecture_contents,many=True)
    return Response(lecture_contents_serializer.data,status=status.HTTP_200_OK)
  
def return_availability(user_id,lecture_id):
  try:
    return LectureAvailabilityAndCompletion.objects.get(user_id=user_id, lecture_id=lecture_id)
  except ObjectDoesNotExist:
    return "No se ha registrado la disponibilidad de esta lección para este usuario"