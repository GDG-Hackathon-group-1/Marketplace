from celery import shared_task
from django.utils import timezone
from .models import AuctionProduct

@shared_task
def close_expired_auctions():
    expired = AuctionProduct.objects.filter(is_closed=False, deadline__lte=timezone.now())
    for auction in expired:
        highest_bid = auction.bids.order_by('-amount').first()
        if highest_bid:
            # Optionally notify winner here
            print(f"Auction for {auction.product.name} closed. Winner: {highest_bid.user}")
        else:
            print(f"Auction for {auction.product.name} closed. No bids placed.")
        auction.is_closed = True
        auction.save()
