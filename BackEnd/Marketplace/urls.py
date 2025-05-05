from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


def home(request):
    return HttpResponse("Successfully Worked!")


schema_view = get_schema_view(
    openapi.Info(
        title="Social Media App API",
        default_version='v1',
        description="API documentation for the Social Media App",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="your@email.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('api/', include('bidding.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
    path('', include('users.urls')),
=======
>>>>>>> 0b8848986244a98ad3938eda629f00e51fe2a3ff

    # Modular API route structure
    path('api/products/', include('products.urls')),
    path('api/bidding/', include('bidding.urls')),
    path('api/messaging/', include('messaging.urls')),
    path('api/users/', include('users.urls')),

    # Swagger and Redoc
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
