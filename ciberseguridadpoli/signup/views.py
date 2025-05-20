from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Profile
from django.http import HttpResponseRedirect
from .serializer import SignupSerializer



class SignUpView(APIView):
  def post(self,request):
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
      serializer.save()
      return Response({"mensaje":"Usuario creado exitosamente."},status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    email_exists = User.objects.filter(email=email).exists()
    if email_exists:
      return Response({"error": "La dirección de correo ya existe."},status=status.HTTP_409_CONFLICT)

    username_exists = User.objects.filter(username=username).exists()
    if username_exists:
      return Response({"error":"El nombre de usuario ya existe."},status=status.HTTP_409_CONFLICT)
    
    user = User.objects.create_user(username,email,password)
    user.first_name = first_name
    user.last_name = last_name
    user.save()

    print(user.pk)
    profile = Profile(user=user,profile_picture=profile_picture)
    profile.save()
    #return HttpResponseRedirect(redirect_to="localhost:5123/login")
  # 

