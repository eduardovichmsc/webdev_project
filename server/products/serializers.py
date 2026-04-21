from rest_framework import serializers
from .models import Category, Product, ProductImage, OrderItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'order']


class ProductSerializer(serializers.ModelSerializer):
    images   = ProductImageSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'price',
            'category', 'category_id',
            'material', 'sizes', 'length', 'has_charm',
            'is_active', 'created_at', 'images',
        ]
        read_only_fields = ['id', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True,
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product_id', 'product_detail', 'quantity', 'created_at']
        read_only_fields = ['id', 'created_at']
