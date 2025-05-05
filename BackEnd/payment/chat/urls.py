from django.urls import path
from .views import SendMessageView, ChatWithUserView, ChatByOrderView

urlpatterns = [
    path('send/', SendMessageView.as_view()),
    path('<int:user_id>/', ChatWithUserView.as_view()),
    path('order/<int:order_id>/', ChatByOrderView.as_view()),
]
