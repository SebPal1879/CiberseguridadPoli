from django.urls import path
from .views import SignInView, profile

urlpatterns = [
  path('',SignInView.as_view()),
]