from django.urls import path
from .views import OrderItemListView, OrderItemDeleteView

urlpatterns = [
    path('',       OrderItemListView.as_view(),   name='order-list'),
    path('<int:pk>/', OrderItemDeleteView.as_view(), name='order-delete'),
]
