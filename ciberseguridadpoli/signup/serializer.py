from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from learning.models import Section,Lecture,LectureAvailabilityAndCompletion
from quiz.models import Quiz, AvailableQuiz


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
    print(validated_data['password'])

    user.set_password(validated_data['password'])
    user.save()

    Profile.objects.create(user=user, profile_picture=profile_picture)

    for section in Section.objects.all():
      for lecture in Lecture.objects.filter(section=section):
        LectureAvailabilityAndCompletion.objects.create(user=user,lecture=lecture)

    # Se toma la primera sección de aprendizaje según el número de sección
    first_section = Section.objects.order_by('section_number').first()

    # Se toman las lecciones asociadas a esa primera sección, se ordenan por número de lección y se toma la primera
    first_lecture = Lecture.objects.filter(section=first_section).order_by('lecture_in_section_number').first()

    # Se desbloquea la primera lección disponible del usuario recién creado
    first_availability = LectureAvailabilityAndCompletion.objects.get(user=user,lecture=first_lecture)
    first_availability.is_available = True
    first_availability.save()

    for quiz in Quiz.objects.all():
      # Se asignan todos los quizzes al usuario (como default=False, estarán bloqueados, y se desbloquearán a medida que avance el curso)
      AvailableQuiz.objects.create(user=user,quiz=quiz)
    return user