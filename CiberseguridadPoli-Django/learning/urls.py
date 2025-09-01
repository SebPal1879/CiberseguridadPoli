from django.urls import path
from .views import SectionsView,LecturesInSectionView,LectureContentsView, AddSections, AddLectures, AddContents
urlpatterns = [
  path('',SectionsView.as_view()),
  path('section/<int:section_id>/',LecturesInSectionView.as_view(),name="Lecture in Section"),
  path('section/<int:section_id>/lecture/<int:lecture_id>/',LectureContentsView.as_view()),
  path('add/sections/',AddSections.as_view()),
  path('add/lectures/',AddLectures.as_view()),
  path('add/contents/',AddContents.as_view()),
]