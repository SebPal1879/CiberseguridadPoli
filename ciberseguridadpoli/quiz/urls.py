from django.urls import path,include
#from rest_framework.documentation import include_docs_urls
#from rest_framework import routers

from .views import FetchQuizAPIView,Lunerview,QuizView, AvailableQuizzesView, QuizCompletionView,QuisHistoryView

#router = routers.DefaultRouter()
#router.register(r'quiz',QuizView,'quiz')


urlpatterns = [
#  path("api/v1/",include(router.urls)),
  path("",AvailableQuizzesView.as_view()),
  path("<int:id>/",FetchQuizAPIView.as_view()),
  path("completion/<int:id>/",QuizCompletionView.as_view()),
  path("history",QuisHistoryView.as_view()),
  path("prueba",Lunerview,name="prueba"),

  #path("docs/", include_docs_urls(title="Quiz API"))
]