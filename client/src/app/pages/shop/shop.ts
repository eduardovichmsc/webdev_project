import { Component, signal } from '@angular/core';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { Title } from '@angular/platform-browser';
import { PATHS } from '../../core/configs/paths.config';
import { Category } from '../../shared/models/category.model';
import { PaginatedResponse } from '../../shared/models/api.model';
import { ProductService } from '../../shared/services/product/product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [Breadcrumbs, ProductCard],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  constructor(
    private title: Title,
    private productService: ProductService,
  ) {
    this.title.setTitle('Shop: Simuero');
    this.loadCategories();
    this.loadProducts();
  }

  link = PATHS.SHOP.ROOT;
  breadcrumbs = [
    { name: 'Home', href: PATHS.HOME },
    { name: 'Shop', href: PATHS.SHOP.ROOT },
  ];

  categories = signal<Category[]>([]);
  allProducts = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  selectedCategorySlug = signal<string>('');

  limit = 6;
  offset = signal<number>(0);
  totalCount = signal<number>(0);

  private loadCategories() {
    this.productService.getProductCategories().subscribe({
      next: (backendCategories: any) => {
        const allCategory: Category = { id: 0, slug: '', name: 'All' };
        this.categories.set([allCategory, ...backendCategories]);
      },
      error: (err) => console.error('Ошибка загрузки категорий', err),
    });
  }

  loadProducts() {
    this.isLoading.set(true);

    this.productService
      .getProducts(this.selectedCategorySlug(), this.limit, this.offset())
      .subscribe({
        next: (response: PaginatedResponse<any>) => {
          console.log(response);

          this.totalCount.set(response.count);

          const mappedProducts = response.results.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            image: p.image && p.image.length > 0 ? p.image[0] : '',
            name: p.name,
            price: p.price,
            categorySlug: p.categorySlug,
          }));

          this.allProducts.set(mappedProducts);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Ошибка загрузки продуктов', err);
          this.isLoading.set(false);
        },
      });
  }

  selectCategory(slug: string) {
    if (this.selectedCategorySlug() === slug) return;

    this.selectedCategorySlug.set(slug);
    this.offset.set(0);
    this.loadProducts();
  }

  nextPage() {
    if (this.offset() + this.limit < this.totalCount()) {
      this.offset.set(this.offset() + this.limit);
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.offset() - this.limit >= 0) {
      this.offset.set(this.offset() - this.limit);
      this.loadProducts();
    }
  }
}
