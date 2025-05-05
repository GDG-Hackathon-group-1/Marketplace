from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    is_seller = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class SellerVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_verification')
    document_status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
