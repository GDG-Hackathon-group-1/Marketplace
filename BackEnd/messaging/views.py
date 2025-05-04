from django.shortcuts import render

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import MessageThread, Message
from .serializers import MessageThreadSerializer, MessageSerializer

class MessageThreadListView(generics.ListAPIView):
    serializer_class = MessageThreadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MessageThread.objects.filter(models.Q(buyer=self.request.user) | models.Q(seller=self.request.user))

class MessageThreadDetailView(generics.RetrieveAPIView):
    queryset = MessageThread.objects.all()
    serializer_class = MessageThreadSerializer
    permission_classes = [permissions.IsAuthenticated]

class SendMessageView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        thread_id = kwargs.get("id")
        thread = MessageThread.objects.get(id=thread_id)
        data = request.data.copy()
        data["thread"] = thread.id
        data["sender"] = request.user.id
        return super().create(request, data)
