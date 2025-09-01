from django.urls import path
from .views import SupportRequest

urlpatterns = [
  path("new/",SupportRequest.as_view()),
]