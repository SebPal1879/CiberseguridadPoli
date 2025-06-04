from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, force_bytes, DjangoUnicodeDecodeError
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from .serializer import SignInSerializer
from ciberseguridadpoli.settings import FRONTEND_URL

# Create your views here.
class SignInView(APIView):
  def post(self,request):
    print("SignInView")
    print(request.data["username"])
    print(request.data["password"])
    user = authenticate(username=request.data["username"], password=request.data["password"])
    if user is not None:
      print("Autenticado con exito")
      token, created = Token.objects.get_or_create(user=user)
      return Response({"mensaje": "Autenticado exitosamente", "token": token.key},status=status.HTTP_202_ACCEPTED)
    return Response({"mensaje": "Autenticación fallida"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
  
  print(request.user.id)

  return Response({"usuario": request.user.username}, status=status.HTTP_200_OK)

class PasswordReset(APIView):
  def post(self,request):
    data_request = request.data
    try:
      user = User.objects.get(email=data_request["email"])
      print("tin")
      uidb64 = urlsafe_base64_encode(force_bytes(user.id))
      print("tain")
      
      token = PasswordResetTokenGenerator().make_token(user=user) 
      current_site = get_current_site(request=request).domain
      relative_link = reverse('password-reset-confirm', kwargs={'uidb64':uidb64,'token':token})
      absurl = FRONTEND_URL+  relative_link
      print(current_site)
      print(relative_link)
      email_body = "Hola,\nUsa el enlace abajo para reiniciar tu contraseña.\n" + absurl
      data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reinicia tu contraseña.'}
      Util.send_email(data)
    except ObjectDoesNotExist:
      print("No existe")
    return Response({"Mensaje":"Si existe este correo, se ha enviado un enlace de reinicio."},status=status.HTTP_200_OK)

class PasswordTokenCheck(APIView):
  def post(self,request,uidb64,token):
    try:
      id = smart_str(urlsafe_base64_decode(uidb64))
      user = User.objects.get(pk= id)
      if not PasswordResetTokenGenerator().check_token(user,token):
        return Response({"Error": "El token no es válido. Por favor, solicita uno nuevo"})
      password = request.data["password"]
      user.set_password(password)
      user.save()
      return Response({"Exitoso": True, "Mensaje": "Credenciales válidas", 'uidb64':uidb64, 'token': token},status=status.HTTP_200_OK)

    except DjangoUnicodeDecodeError:
      return Response({"Error": "El token no es válido."})
  
  def get(self,request,uidb64,token):
    try:
      id = smart_str(urlsafe_base64_decode(uidb64))
      user = User.objects.get(pk= id)
      if not PasswordResetTokenGenerator().check_token(user,token):
        return Response({"Error": "El token no es válido. Por favor, solicita uno nuevo"})
      return Response({"email": user.email}, status=status.HTTP_200_OK)
    except DjangoUnicodeDecodeError:
      return Response({"Error": "El token no es válido."})