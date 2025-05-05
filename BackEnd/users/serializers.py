from rest_framework import serializers
from .models import User, SellerVerification


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'profile_image', 'is_seller', 'is_verified', 'created_at']


class SellerVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerVerification

        fields = '__all__'

        fields = ['user', 'document_status', 'submitted_at']


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)


class UpdateUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)


class LogoutSerializer(serializers.Serializer):
    # No input fields are required for logout, but serializer is added for Swagger docs
    pass
