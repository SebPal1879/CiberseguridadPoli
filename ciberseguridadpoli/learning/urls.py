from django.urls import path
from .views import SectionsView,LecturesView,LectureContentView, AddSections
urlpatterns = [
  path('',SectionsView.as_view()),
  path('section/<int:section_id>/',LecturesView.as_view()),
  path('section/<int:section_id>/lecture/<int:lecture_id>/',LectureContentView.as_view()),
  path('add/',AddSections.as_view()),
]