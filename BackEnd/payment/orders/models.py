from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Preparing", "Preparing"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered")
    ]
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
    chapa_payment_id = models.CharField(max_length=100)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sales')
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
