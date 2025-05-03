from django.urls import path
from .views import MessageThreadListView, MessageThreadDetailView, SendMessageView

urlpatterns = [
    path('api/messages/threads/', MessageThreadListView.as_view(), name='message-threads'),
    path('api/messages/threads/<int:pk>/', MessageThreadDetailView.as_view(), name='message-thread-detail'),
    path('api/messages/threads/<int:id>/send/', SendMessageView.as_view(), name='send-message'),
]
