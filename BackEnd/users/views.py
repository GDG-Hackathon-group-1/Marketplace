<<<<<<< HEAD
from rest_framework import status, generics, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from .models import User, SellerVerification
from .serializers import (
    UserSerializer,
    LoginSerializer,
    PasswordResetSerializer,
    SellerVerificationSerializer,
)

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(password=make_password(self.request.data['password']))


class LoginView(views.APIView):
    permission_classes = [AllowAny]

=======
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from .models import User, SellerVerification
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer, LogoutSerializer,
    UpdateUserSerializer, ResetPasswordSerializer, SellerVerificationSerializer
)

class RegisterView(APIView):
    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email']
            )
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    @swagger_auto_schema(request_body=LoginSerializer)
>>>>>>> 0b8848986244a98ad3938eda629f00e51fe2a3ff
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                login(request, user)
<<<<<<< HEAD
                return Response({'message': 'Login successful'}, status=200)
            return Response({'error': 'Invalid credentials'}, status=400)
        return Response(serializer.errors, status=400)


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=200)


class GetUserByIdView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    lookup_url_kwarg = 'user_id'


class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    lookup_url_kwarg = 'user_id'


class GetAllUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class VerifySellerView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        if not user.is_seller:
            return Response({'error': 'User is not a seller'}, status=400)
        SellerVerification.objects.create(user=user, document_status='Pending')
        return Response({'message': 'Seller verification initiated'}, status=201)


class ResetPasswordView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            user = get_object_or_404(User, email=serializer.validated_data['email'])
            user.password = make_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Password reset successful'}, status=200)
        return Response(serializer.errors, status=400)
=======
                return Response({'message': 'Login successful'})
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    @swagger_auto_schema(request_body=LogoutSerializer)
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


class GetUserByIdView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UpdateUserView(APIView):
    @swagger_auto_schema(request_body=UpdateUserSerializer)
    def put(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            # Update the user with partial data
            user.username = serializer.validated_data.get('username', user.username)
            user.email = serializer.validated_data.get('email', user.email)
            user.save()
            return Response({'message': 'User updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAllUsersView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class VerifySellerView(APIView):
    @swagger_auto_schema(request_body=SellerVerificationSerializer)
    def post(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        if not user.is_seller:
            return Response({'error': 'User is not a seller'}, status=status.HTTP_400_BAD_REQUEST)
        SellerVerification.objects.create(user=user, document_status='Pending')
        return Response({'message': 'Seller verification initiated'}, status=status.HTTP_201_CREATED)


class ResetPasswordView(APIView):
    @swagger_auto_schema(request_body=ResetPasswordSerializer)
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = get_object_or_404(User, email=serializer.validated_data['email'])
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Password reset successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> 0b8848986244a98ad3938eda629f00e51fe2a3ff
