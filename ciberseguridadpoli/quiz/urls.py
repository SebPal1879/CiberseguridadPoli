from django.urls import path,include
#from rest_framework.documentation import include_docs_urls
#from rest_framework import routers

from .views import SearchQuizAPIView,Lunerview,QuizView, AvailableQuizView

#router = routers.DefaultRouter()
#router.register(r'quiz',QuizView,'quiz')


urlpatterns = [
#  path("api/v1/",include(router.urls)),
  path("find-quiz/",SearchQuizAPIView.as_view()),
  path("prueba",Lunerview,name="prueba"),
  path("",AvailableQuizView.as_view()),
  #path("docs/", include_docs_urls(title="Quiz API"))
]