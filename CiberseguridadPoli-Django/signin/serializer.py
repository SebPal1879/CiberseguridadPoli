from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from signup.models import Profile

class SignInSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username','password')

class AccountInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id','first_name','last_name','username','email',)


class ProfileInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ('profile_picture','telephone_number','program','level')