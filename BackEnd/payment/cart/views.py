from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

class ViewCart(APIView):
    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class AddToCart(APIView):
    def post(self, request):
        # expected fields: product_id, quantity
        # logic stub
        return Response({"message": "Add to cart not implemented yet"}, status=200)

# Similarly: UpdateCartItem, RemoveFromCart
