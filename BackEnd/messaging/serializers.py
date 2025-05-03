from rest_framework import serializers
from .models import MessageThread, Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class MessageThreadSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = MessageThread
        fields = ['id', 'buyer', 'seller', 'product', 'messages']
