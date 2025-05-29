from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from learning.models import LectureAvailabilityAndCompletion,Section,Lecture
from learning.serializer import AvailabilityCompletionSerializer, AvailableSectionSerializer
# Create your views here.

class UnitView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self,request):
    print(request.user.id)
    available_sections = []
    for section in Section.objects.all().order_by('section_number'):
      lecture = Lecture.objects.filter(section_id=section).order_by('lecture_in_section_number').first()
      user_lecture = LectureAvailabilityAndCompletion.objects.get(id_user=request.user.id, id_lecture=lecture)
      if user_lecture.is_available:
        available_sections.append(section)
    
    section_serializer = AvailableSectionSerializer(available_sections,many=True)#Los serializers pueden tomar tanto querysets como arreglos

    return Response(section_serializer.data, status=status.HTTP_200_OK)





    available_lectures = LectureAvailabilityAndCompletion.objects.filter(id_user=request.user.id)
    available_lectures_serializer = AvailabilityCompletionSerializer(available_lectures,many=True)
    
    return Response(available_lectures_serializer.data, status=status.HTTP_201_CREATED)
    # token = Token.objects.get(key=request.data)
    # user = token.user

