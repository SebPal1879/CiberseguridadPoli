from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class SignupSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('first_name','last_name','username','password','email',)
    extra_kwargs = {
      'username': {
        'error_messages' : { 
          'unique':'El nombre de usuario ya existe.'
          }
      }
    }



  def validate_email(self,value):
    if User.objects.filter(email=value).exists():
      raise serializers.ValidationError("El correo ya existe.")
    return value
    
  def validate_username(self,value):

    return value
  
  def create(self, validated_data):
    profile_picture = validated_data.pop('profile_picture',None)

    user = User.objects.create(**validated_data)

    Profile.objects.create(user=user, profile_picture=profile_picture)
    
    return user