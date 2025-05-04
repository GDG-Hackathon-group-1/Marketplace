from rest_framework import serializers
from .models import User, SellerVerification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'profile_image', 'is_seller', 'is_verified', 'created_at']

class SellerVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerVerification
        fields = ['user', 'document_status', 'submitted_at']
