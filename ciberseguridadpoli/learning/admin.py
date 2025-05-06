from django.contrib import admin
from .models import Lecture,Section,LectureAvailabilityAndCompletion,LectureContent

# Register your models here.
admin.site.register(Lecture)
admin.site.register(Section)
admin.site.register(LectureAvailabilityAndCompletion)
admin.site.register(LectureContent)
