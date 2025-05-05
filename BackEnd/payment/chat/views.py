from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Chat
from .serializers import ChatSerializer

class SendMessageView(APIView):
    def post(self, request):
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ChatWithUserView(APIView):
    def get(self, request, user_id):
        chats = Chat.objects.filter(
            (Q(sender=request.user) & Q(receiver_id=user_id)) |
            (Q(sender_id=user_id) & Q(receiver=request.user))
        ).order_by('created_at')
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)

class ChatByOrderView(APIView):
    def get(self, request, order_id):
        chats = Chat.objects.filter(order_id=order_id).order_by('created_at')
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)
