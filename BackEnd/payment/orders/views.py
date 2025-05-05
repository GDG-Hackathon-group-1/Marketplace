from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CheckoutView(APIView):
    def post(self, request):
        # Assume payment succeeded and total is calculated from frontend
        data = request.data
        order = Order.objects.create(
            buyer=request.user,
            total_amount=data.get('total_amount'),
            chapa_payment_id=data.get('chapa_payment_id'),
            status='Pending'
        )
        for item in data.get('items', []):
            OrderItem.objects.create(
                order=order,
                product_id=item['product_id'],
                seller_id=item['seller_id'],
                quantity=item['quantity'],
                price=item['price']
            )
        return Response({'message': 'Order placed successfully'}, status=201)

class BuyerOrdersView(APIView):
    def get(self, request):
        orders = Order.objects.filter(buyer=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class SellerSalesView(APIView):
    def get(self, request):
        items = OrderItem.objects.filter(seller=request.user)
        serializer = OrderItemSerializer(items, many=True)
        return Response(serializer.data)

class UpdateOrderStatus(APIView):
    def put(self, request, id):
        try:
            order = Order.objects.get(id=id)
            if OrderItem.objects.filter(order=order, seller=request.user).exists():
                order.status = request.data.get('status')
                order.save()
                return Response({'status': 'updated'})
            return Response({'error': 'Unauthorized'}, status=403)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)
