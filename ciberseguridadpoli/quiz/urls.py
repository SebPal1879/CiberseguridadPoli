from django.urls import path,include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from quiz import views

from .views import SearchQuizAPIView

router = routers.DefaultRouter()
router.register(r'quiz',views.QuizView,'quiz')


urlpatterns = [
  path("api/v1/",include(router.urls)),
  path("find-quiz/",SearchQuizAPIView.as_view()),
  path("prueba",views.Lunerview,name="prueba"),
  #path("docs/", include_docs_urls(title="Quiz API"))
]