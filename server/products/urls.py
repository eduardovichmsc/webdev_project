from django.urls import path
from .views import product_list, product_detail, CategoryListView

urlpatterns = [
    path('',              product_list,        name='product-list'),
    path('categories/',   CategoryListView.as_view(), name='category-list'),
    path('<slug:slug>/',  product_detail,      name='product-detail'),
]
