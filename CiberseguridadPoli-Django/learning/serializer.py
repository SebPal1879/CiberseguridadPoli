from rest_framework import serializers

from .models import LectureAvailabilityAndCompletion,Section, Lecture, LectureContent

class AvailabilityCompletionSerializer(serializers.ModelSerializer):
  class Meta:
    model = LectureAvailabilityAndCompletion
    fields =('id','is_available','is_completed','user','lecture')

class SectionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Section
    fields = ('id','section_number','name','description')


class LectureSerializer(serializers.ModelSerializer):
  class Meta:
    model = Lecture
    fields = ('id','lecture_in_section_number','name','section','description')

class LectureContentSerializer(serializers.ModelSerializer):
  class Meta:
    model = LectureContent
    fields =('content_in_lecture_number','content','image_path','lecture','id')