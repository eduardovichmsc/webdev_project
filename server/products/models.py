from django.db import models
from django.contrib.auth.models import User
from .managers import PublishedProductManager


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    name        = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    price       = models.DecimalField(max_digits=10, decimal_places=2)
    category    = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
    )
    material    = models.CharField(max_length=100, blank=True)
    sizes       = models.JSONField(default=list, blank=True)
    length      = models.FloatField(null=True, blank=True)
    has_charm   = models.BooleanField(default=False)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    # aLL products
    objects = models.Manager()
    # only active products
    published = PublishedProductManager()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product   = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',
    )
    image_url = models.CharField(max_length=500)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.product.name} – image #{self.order}'


class OrderItem(models.Model):
    user       = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='order_items',
    )
    product    = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='order_items',
    )
    quantity   = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} – {self.product.name} x{self.quantity}'
