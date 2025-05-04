from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('users/<int:user_id>/', views.get_user_by_id, name='get_user_by_id'),
    path('users/<int:user_id>/update/', views.update_user, name='update_user'),
    path('users/', views.get_all_users, name='get_all_users'),
    path('users/<int:user_id>/verify-seller/', views.verify_seller, name='verify_seller'),
    path('reset-password/', views.reset_password, name='reset_password'),
]
