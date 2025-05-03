# bidding/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('bids/<int:product_id>/place/', views.place_bid, name='place_bid'),
    path('bids/<int:product_id>/', views.list_bids, name='list_bids'),
    path('bids/<int:product_id>/close/', views.close_bidding, name='close_bidding'),
]
