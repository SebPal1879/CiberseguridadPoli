from rest_framework import serializers

from .models import LectureAvailabilityAndCompletion,Section

class AvailabilityCompletionSerializer(serializers.ModelSerializer):
  class Meta:
    model = LectureAvailabilityAndCompletion
    fields =('is_available','is_completed','id_user','id_lecture')

class AvailableSectionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Section
    fields = ('section_number','name','description')
