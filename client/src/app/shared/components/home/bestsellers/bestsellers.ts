import { Component, signal } from '@angular/core';
import { Link } from '../../../ui/link/link';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Carousel } from '../../../ui/carousel/carousel';
import { ProductCard } from '../../../ui/product-card/product-card';
import { register } from 'swiper/element';
import { PATHS } from '../../../../core/configs/paths.config';
import { ProductService } from '../../../services/product/product';
import { PaginatedResponse } from '../../../models/api.model';
import { AnyProduct } from '../../../models/product.model';

register();

@Component({
  selector: 'app-bestsellers',
  imports: [Carousel, Link, CommonModule, RouterLink, ProductCard],
  templateUrl: './bestsellers.html',
  styleUrl: './bestsellers.css',
})
export class Bestsellers {
  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  limit = 6;
  offset = 0;
  link = PATHS.SHOP.ROOT;

  products = signal<any[]>([]);

  loadProducts() {
    this.productService.getProducts(undefined, this.limit, this.offset).subscribe({
      next: (response: PaginatedResponse<AnyProduct>) => {
        const mappedProducts = response.results.map((p) => ({
          id: p.id,
          slug: p.slug,
          image: p.images && p.images.length > 0 ? p.images[0].image_url : '',
          name: p.name,
          price: p.price,
          categorySlug: p.category ? p.category.slug : '',
        }));

        this.products.set(mappedProducts);
      },
      error: (err) => {
        console.error('Ошибка загрузки бестселлеров:', err);
      },
    });
  }
}
