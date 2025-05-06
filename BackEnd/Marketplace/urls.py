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
        title="Marketplace API",
        default_version='v1',
        description="API documentation for the Social Media App",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="your@email.com"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
)

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),

    path('', include('products.urls')),
    path('', include('bidding.urls')),
    path('messaging/', include('messaging.urls')),
    path('', include('users.urls')),

    # Swagger and Redoc
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
