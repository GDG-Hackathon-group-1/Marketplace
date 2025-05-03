from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import AuctionProduct, Bid
from .serializers import BidSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_bid(request, product_id):
    try:
        auction = AuctionProduct.objects.get(product__id=product_id)
    except AuctionProduct.DoesNotExist:
        return Response({'detail': 'Auction not found'}, status=404)

    if auction.is_closed or auction.deadline < timezone.now():
        return Response({'detail': 'Bidding is closed for this product'}, status=400)

    amount = request.data.get('amount')
    if not amount:
        return Response({'detail': 'Amount is required'}, status=400)

    bid = Bid.objects.create(
        product=auction,
        user=request.user,
        amount=amount
    )
    serializer = BidSerializer(bid)
    channel_layer = get_channel_layer()
    
    async_to_sync(channel_layer.group_send)(
        f"bid_{product_id}",
        {
            "type": "new_bid",
            "message": f"{request.user.username} placed a bid of {amount}"
        }
    )



    return Response(serializer.data, status=201)


@api_view(['GET'])
def list_bids(request, product_id):
    try:
        auction = AuctionProduct.objects.get(product__id=product_id)
    except AuctionProduct.DoesNotExist:
        return Response({'detail': 'Auction not found'}, status=404)

    bids = auction.bids.all()
    serializer = BidSerializer(bids, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def close_bidding(request, product_id):
    try:
        auction = AuctionProduct.objects.get(product__id=product_id)
    except AuctionProduct.DoesNotExist:
        return Response({'detail': 'Auction not found'}, status=404)

    if auction.is_closed:
        return Response({'detail': 'Auction already closed'}, status=400)

    if auction.product.seller != request.user:
        return Response({'detail': 'Only seller can close the auction'}, status=403)

    auction.is_closed = True
    auction.save()
    return Response({'detail': 'Auction closed successfully'})
