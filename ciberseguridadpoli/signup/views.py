from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Profile
from .serializer import SignupSerializer



class SignUpView(APIView):
  def post(self,request):
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
      user = serializer.save()
      token, created = Token.objects.get_or_create(user=user)
      return Response({"mensaje":"Usuario creado exitosamente.", "token": token.key},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ImgUploadView(APIView):
  def post(self,request):
    usuario = User.objects.get(pk=5)
    perfil = Profile.objects.get(user=usuario)

    perfil.profile_picture = request.FILES.get("imagen")
    perfil.save()
    return Response({"mensaje": "Mensaje"},status=status.HTTP_200_OK)