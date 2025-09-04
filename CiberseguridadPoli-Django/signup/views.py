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
      return Response(data={"mensaje":"Usuario creado exitosamente.", "token": token.key, "user_profile_data": user_profile_data},status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Vista de prueba; actualmente no se pretende usar para la experiencia del usuario final.
class ImgUploadView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]
  def post(self,request):
    usuario = User.objects.get(pk=request.user.id)
    perfil = Profile.objects.get(user=usuario)

    perfil.profile_picture = request.FILES.get("picture")
    print(request.FILES.get("picture"))
    perfil.save()
    print(perfil.profile_picture.url)
    return Response(data={"mensaje": "Se actualizó correctamente la foto de perfil", "user_profile_data" : perfil.profile_picture.url},status=status.HTTP_200_OK)
  
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
      return Response(data={"Mensaje" : "No se pudo actualizar la información"}, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={"Mensaje" : "Actualizado correctamente."}, status=status.HTTP_200_OK)




