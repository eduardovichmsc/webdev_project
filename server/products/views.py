from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product, Category, OrderItem
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    OrderItemSerializer,
)


# product FBVs

# ordering fields
PRODUCT_ORDERING_FIELDS = {
    'price':        'price',
    '-price':       '-price',
    'name':         'name',
    '-name':        '-name',
    'created_at':   'created_at',
    '-created_at':  '-created_at',
}

@api_view(['GET', 'POST'])
def product_list(request):
    """
    GET  /api/products/  — paginated product list with optional filters & sorting.

    Query params:
      ?category=<slug>   — filter by category
      ?ordering=<field>  — sort by field; allowed values:
                           price, -price, name, -name, created_at, -created_at
                           (default: -created_at — newest first)
      ?limit=<n>         — page size (default 6)
      ?offset=<n>        — page offset (default 0)

    POST /api/products/  — create a new product (auth required)
    """
    if request.method == 'GET':
        qs = Product.published.select_related('category').prefetch_related('images')

        # filter by category 
        category_slug = request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        # sorting
        ordering_param = request.query_params.get('ordering', '-created_at')
        ordering_field = PRODUCT_ORDERING_FIELDS.get(ordering_param, '-created_at')
        qs = qs.order_by(ordering_field)

        # pagination
        try:
            limit  = int(request.query_params.get('limit', 6))
            offset = int(request.query_params.get('offset', 0))
        except ValueError:
            limit, offset = 6, 0

        total   = qs.count()
        results = qs[offset: offset + limit]
        serializer = ProductSerializer(results, many=True)
        return Response({
            'count':    total,
            'limit':    limit,
            'offset':   offset,
            'ordering': ordering_field,
            'results':  serializer.data,
        })

    # POST – (auth required)
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, slug):
    """
    GET    /api/products/<slug>/  — product details
    PUT    /api/products/<slug>/  — update (auth required)
    DELETE /api/products/<slug>/  — soft-delete (auth required)
    """
    try:
        product = Product.objects.select_related('category').prefetch_related('images').get(slug=slug)
    except Product.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    # mutating methods require authentication
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    product.is_active = False
    product.save(update_fields=['is_active'])
    return Response(status=status.HTTP_204_NO_CONTENT)


# category CBV

class CategoryListView(APIView):
    """GET /api/products/categories/ — list all categories"""
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


# orderItem CBVs

class OrderItemListView(generics.ListCreateAPIView):
    """
    GET  /api/orders/  — list current user's order items
    POST /api/orders/  — add an item to the cart
    """
    serializer_class   = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(user=self.request.user).select_related('product')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderItemDeleteView(generics.DestroyAPIView):
    """DELETE /api/orders/<id>/ — remove an item from the cart"""
    serializer_class   = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrderItem.objects.filter(user=self.request.user)
