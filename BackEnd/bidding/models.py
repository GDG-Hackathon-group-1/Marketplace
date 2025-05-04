from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product
from django.utils import timezone


User = get_user_model()

class AuctionProduct(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='auction')
    starting_bid = models.DecimalField(max_digits=10, decimal_places=2)
    deadline = models.DateTimeField()
    is_closed = models.BooleanField(default=False)

    def __str__(self):
        return f"Auction for {self.product.name}"
    @property
    def should_be_closed(self):
        return not self.is_closed and self.deadline <= timezone.now()

class Bid(models.Model):
    product = models.ForeignKey(AuctionProduct, on_delete=models.CASCADE, related_name='bids')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-amount']

    def __str__(self):
        return f"{self.user} bid {self.amount} on {self.product.product.name}"
