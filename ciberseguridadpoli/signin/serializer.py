from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class SignInSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username','password')
