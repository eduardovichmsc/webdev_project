from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/orders/',   include('products.order_urls')),
    path('api/auth/',     include('accounts.urls')),
]
