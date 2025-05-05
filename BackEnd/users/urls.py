from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('users/<int:user_id>/', GetUserByIdView.as_view(), name='get_user'),
    path('users/<int:user_id>/update/', UpdateUserView.as_view(), name='update_user'),
    path('users/', GetAllUsersView.as_view(), name='all_users'),
    path('users/<int:user_id>/verify-seller/', VerifySellerView.as_view(), name='verify_seller'),
    path('users/reset-password/', ResetPasswordView.as_view(), name='reset_password'),
]

from .views import (
    RegisterView, LoginView, LogoutView, GetUserByIdView,
    UpdateUserView, GetAllUsersView, VerifySellerView, ResetPasswordView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/<int:user_id>/', GetUserByIdView.as_view(), name='get_user_by_id'),
    path('user/<int:user_id>/update/', UpdateUserView.as_view(), name='update_user'),
    path('users/', GetAllUsersView.as_view(), name='get_all_users'),
    path('verify-seller/<int:user_id>/', VerifySellerView.as_view(), name='verify_seller'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
]
