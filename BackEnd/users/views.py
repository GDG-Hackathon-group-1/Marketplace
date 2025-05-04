from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from .models import User, SellerVerification
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
        )
        return JsonResponse({'message': 'User registered successfully'}, status=201)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(username=data['username'], password=data['password'])
        if user:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'}, status=200)

def get_user_by_id(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return JsonResponse({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_seller': user.is_seller,
        'is_verified': user.is_verified,
    }, status=200)

@csrf_exempt
def update_user(request, user_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        user = get_object_or_404(User, id=user_id)
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.save()
        return JsonResponse({'message': 'User updated successfully'}, status=200)

def get_all_users(request):
    users = User.objects.all().values('id', 'username', 'email', 'is_seller', 'is_verified')
    return JsonResponse(list(users), safe=False, status=200)

@csrf_exempt
def verify_seller(request, user_id):
    if request.method == 'POST':
        user = get_object_or_404(User, id=user_id)
        if not user.is_seller:
            return JsonResponse({'error': 'User is not a seller'}, status=400)
        SellerVerification.objects.create(user=user, document_status='Pending')
        return JsonResponse({'message': 'Seller verification initiated'}, status=201)

@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = get_object_or_404(User, email=data['email'])
        user.password = make_password(data['new_password'])
        user.save()
        return JsonResponse({'message': 'Password reset successfully'}, status=200)
