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
  selectedCategorySlug = signal<string>('all');
  selectedOrdering = signal<string>('-created_at');

  limit = 9;
  offset = signal<number>(0);
  totalCount = signal<number>(0);
  sortOptions = [
    { value: '-created_at', label: 'Newest' },
    { value: 'created_at', label: 'Oldest' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: '-name', label: 'Name: Z to A' },
  ];

  private loadCategories() {
    this.productService.getProductCategories().subscribe({
      next: (backendCategories: any) => {
        const allCategory: Category = { id: 0, slug: 'all', name: 'All' };
        this.categories.set([allCategory, ...backendCategories]);
        console.log(backendCategories);
      },
      error: (err) => console.error('Ошибка загрузки категорий', err),
    });
  }

  loadProducts() {
    this.isLoading.set(true);

    this.productService
      .getProducts(this.selectedCategorySlug(), this.limit, this.offset(), this.selectedOrdering())
      .subscribe({
        next: (response: PaginatedResponse<any>) => {
          console.log(response);

          this.totalCount.set(response.count);

          const mappedProducts = response.results.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            image: p.images && p.images.length > 0 ? p.images[0].image_url : '',
            name: p.name,
            price: p.price,
            categorySlug: p.category ? p.category.slug : '',
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

  changeOrdering(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOrdering.set(selectElement.value);
    this.offset.set(0);
    this.loadProducts();
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
      this.scrollToProducts();
    }
  }

  prevPage() {
    if (this.offset() - this.limit >= 0) {
      this.offset.set(this.offset() - this.limit);
      this.loadProducts();
      this.scrollToProducts();
    }
  }

  private scrollToProducts(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }
}
