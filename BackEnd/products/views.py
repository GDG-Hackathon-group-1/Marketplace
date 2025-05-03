from django.forms import ValidationError
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters
from django.db.models import Count, Avg, Q, Case, When, IntegerField, Case, When, IntegerField, Value
from .models import Category, Product, Review, Wishlist
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model

from .serializers import (
    CategorySerializer, ProductSerializer, WishlistSerializer,
    ReviewSerializer, RecommendationSerializer
)

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price']


class ProductViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']

    @action(detail=False, methods=['get'], url_path='recommend')
    def recommend(self, request):
        recommender = MLModelHandler()
        products = recommender.recommend(request.user)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


class MLModelHandler:
    def recommend(self, user):
        recommendations = set()

        wishlist_products = Product.objects.filter(
            id__in=Wishlist.objects.filter(user=user).values_list('product_id', flat=True)
        )[:5]
        recommendations.update(wishlist_products)

        most_reviewed = Product.objects.annotate(
            review_count=Count('reviews')
        ).order_by('-review_count')[:5]
        recommendations.update(most_reviewed)

        highest_rated = Product.objects.annotate(
            avg_rating=Avg('reviews__rating')
        ).order_by('-avg_rating')[:5]
        recommendations.update(highest_rated)

        interacted_categories = Product.objects.filter(
            id__in=Wishlist.objects.filter(user=user).values_list('product_id', flat=True)
        ).values_list('category', flat=True)

        content_based = Product.objects.filter(
            category__in=interacted_categories
        ).exclude(id__in=[p.id for p in recommendations])[:5]
        recommendations.update(content_based)

        if hasattr(user, 'browsing_history'):
            browsed_categories = user.browsing_history.values_list('product__category', flat=True)
            browsed_products = Product.objects.filter(
                category__in=browsed_categories
            ).exclude(id__in=[p.id for p in recommendations])[:5]
            recommendations.update(browsed_products)

        needed = 15 - len(recommendations)
        if needed > 0:
            random_products = Product.objects.exclude(
                id__in=[p.id for p in recommendations]
            ).order_by('?')[:needed]
            recommendations.update(random_products)

        return list(recommendations)[:15]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def search(self, request):
        query = request.query_params.get('q', '')
        results = Product.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
        serializer = self.get_serializer(results, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Review.objects.filter(product_id=self.kwargs['product_pk'])

    def perform_create(self, serializer):
        review = serializer.save(user=self.request.user, product_id=self.kwargs['product_pk'])
        product = review.product
        product_reviews = product.reviews.all()
        product.review_count = product_reviews.count()
        product.average_rating = product_reviews.aggregate(avg=Avg('rating'))['avg'] or 0
        product.save()
        return Response(serializer.data)
    

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product_id = self.request.data.get('product')
        if Wishlist.objects.filter(user=self.request.user, product_id=product_id).exists():
            raise ValidationError("Product already in wishlist.")
        serializer.save(user=self.request.user)


class RecommendationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        user = request.user
        handler = MLModelHandler()
        products = handler.recommend(user)
        data = ProductSerializer(products, many=True).data
        return Response(data)



@action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
def search(self, request):
    query = request.query_params.get('q', '').strip().lower()

    if not query:
        return Response([])

    qs = Product.objects.annotate(
        relevance=Case(
            When(name__icontains=query, then=Value(1)),
            When(description__icontains=query, then=Value(2)),
            default=Value(3),
            output_field=IntegerField()
        )
    ).filter(
        Q(name__icontains=query) | Q(description__icontains=query)
    ).order_by('relevance', 'name')

    serializer = self.get_serializer(qs, many=True)
    return Response(serializer.data)
