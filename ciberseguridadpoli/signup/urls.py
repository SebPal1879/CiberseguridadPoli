from django.urls import path
from .views import SignUpView, ImgUploadView, ChangeAccountInfoView

urlpatterns = [
  path('',SignUpView.as_view()),
  path('imagen/',ImgUploadView.as_view()),
  path('change/',ChangeAccountInfoView.as_view())
]