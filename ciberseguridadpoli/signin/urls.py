from django.urls import path
from .views import SignInView, profile, PasswordReset, PasswordTokenCheck,IsAuthenticated

urlpatterns = [
  path('',SignInView.as_view()),
  path('authenticated/',IsAuthenticated.as_view()),
  path('request-reset-email/',PasswordReset.as_view(),name="request-reset-email"),
  path('password-reset/<uidb64>/<token>',PasswordTokenCheck.as_view(),name="password-reset-confirm")
]