from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product  # adjust path as needed

User = get_user_model()

class MessageThread(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='buyer_threads')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seller_threads')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.buyer} ↔ {self.seller}"

class Message(models.Model):
    thread = models.ForeignKey(MessageThread, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.sender} to {self.receiver}"
