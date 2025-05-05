from django.urls import path
from .views import CheckoutView, BuyerOrdersView, SellerSalesView, UpdateOrderStatus

urlpatterns = [
    path('checkout/', CheckoutView.as_view()),
    path('', BuyerOrdersView.as_view()),
    path('sales/', SellerSalesView.as_view()),
    path('<int:id>/update_status/', UpdateOrderStatus.as_view()),
]
