from django.urls import path
from .views import MessageThreadListView, MessageThreadDetailView, SendMessageView

urlpatterns = [
    path('threads/', MessageThreadListView.as_view(), name='message-threads'),
    path('threads/<int:pk>/', MessageThreadDetailView.as_view(), name='message-thread-detail'),
    path('threads/<int:id>/send/', SendMessageView.as_view(), name='send-message'),
]
