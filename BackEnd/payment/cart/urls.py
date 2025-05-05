from django.urls import path
from .views import ViewCart, AddToCart

urlpatterns = [
    path('', ViewCart.as_view()),
    path('add/', AddToCart.as_view()),
    # path('update/', UpdateCartItem.as_view()),
    # path('remove/<int:product_id>/', RemoveFromCart.as_view()),
]
