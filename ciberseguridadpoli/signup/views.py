from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializer import SignupSerializer
from signin.views import get_user_data

class SignUpView(APIView):
  def post(self,request):
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
      user, profile = serializer.save()
      user_profile_data = get_user_data(user,profile)
      token, created = Token.objects.get_or_create(user=user)
      return Response({"mensaje":"Usuario creado exitosamente.", "token": token.key, "user_profile_data": user_profile_data},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ImgUploadView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]
  def post(self,request):
    usuario = User.objects.get(pk=request.user.id)
    perfil = Profile.objects.get(user=usuario)

    perfil.profile_picture = request.FILES.get("imagen")
    perfil.save()
    return Response({"mensaje": "Mensaje"},status=status.HTTP_200_OK)
  
class ChangeAccountInfoView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]
  def post(self,request):
    user = User.objects.get(pk=request.user.id)
    profile = Profile.objects.get(user=user)

    try:
      profile.level = request.data.get("level")
      profile.telephone_number = request.data.get("telephone")

      profile.save()
    except:
      return Response({"Mensaje" : "No se pudo actualizar la información"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"Mensaje" : "Actualizado correctamente."}, status=status.HTTP_200_OK)




