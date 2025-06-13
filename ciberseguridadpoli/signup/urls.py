from django.urls import path
from .views import SignUpView, ImgUploadView

urlpatterns = [
  path('',SignUpView.as_view()),
  path('imagen/',ImgUploadView.as_view()),
]