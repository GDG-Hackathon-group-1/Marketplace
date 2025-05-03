# bidding/serializers.py
from rest_framework import serializers
from .models import AuctionProduct, Bid

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'
        read_only_fields = ['timestamp']

class AuctionProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionProduct
        fields = '__all__'
