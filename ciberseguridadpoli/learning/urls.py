from django.urls import path
from .views import SectionsView,LecturesView,LectureContentView, AddSections, AddLectures, AddContents
urlpatterns = [
  path('',SectionsView.as_view()),
  path('section/<int:section_id>/',LecturesView.as_view()),
  path('section/<int:section_id>/lecture/<int:lecture_id>/',LectureContentView.as_view()),
  path('add/learning/',AddSections.as_view()),
  path('add/lectures/',AddLectures.as_view()),
  path('add/contents/',AddLectures.as_view()),
]