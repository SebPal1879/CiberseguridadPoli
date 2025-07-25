from django.urls import path,include
#from rest_framework.documentation import include_docs_urls
#from rest_framework import routers

from .views import FetchQuizAPIView, AvailableQuizzesView, QuizCompletionView,QuizHistoryView

#router = routers.DefaultRouter()
#router.register(r'quiz',QuizView,'quiz')


urlpatterns = [
#  path("api/v1/",include(router.urls)),
  path("",AvailableQuizzesView.as_view()),
  path("<int:id>/",FetchQuizAPIView.as_view()),
  path("completion/<int:id>/",QuizCompletionView.as_view()),
  path("history",QuizHistoryView.as_view()),

  #path("docs/", include_docs_urls(title="Quiz API"))
]