from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializer import SignInSerializer

# Create your views here.
class SignInView(APIView):
  def post(self,request):
    print("SignInView")
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
  
  print(request.user)

  return Response({"usuario": request.user.username}, status=status.HTTP_200_OK)