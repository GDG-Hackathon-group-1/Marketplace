from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, WishlistViewSet,
    ReviewViewSet, RecommendationViewSet
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet)
router.register(r'recommendations', RecommendationViewSet, basename='recommendations')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

products_router = NestedDefaultRouter(router, r'products', lookup='product')
products_router.register(r'reviews', ReviewViewSet, basename='product-reviews')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(products_router.urls)),
]

