import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyProduct } from '../../shared/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { Breadcrumb, Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { PATHS } from '../../core/configs/paths.config';
import { Category } from '../../shared/models/category.model';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, tap, catchError, finalize, of, filter, map } from 'rxjs';
import { ProductService } from '../../shared/services/product/product';
import { Tab, Tabs } from '../../shared/ui/tabs/tabs';
import { CartService } from '../../shared/services/cart/cart';

@Component({
  selector: 'app-shop-id',
  standalone: true,
  imports: [CurrencyPipe, Breadcrumbs, Tabs],
  templateUrl: './shop-id.html',
  styleUrl: './shop-id.css',
})
export class ProductDetail {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private title: Title,
    private cartService: CartService,
  ) {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(),
        map((paramMap) => paramMap.get('slug') || paramMap.get('id')),
        filter((slug): slug is string => !!slug),
        tap(() => {
          this.isProductLoading.set(true);
          this.product.set(undefined);
          this.category.set(undefined);
          this.selectedImageIndex.set(0);
        }),
        switchMap((slug) => this.loadProductData(slug)),
      )
      .subscribe();
  }

  isProductLoading = signal<boolean>(true);
  product = signal<AnyProduct | undefined>(undefined);
  category = signal<Category | undefined>(undefined);
  selectedImageIndex = signal(0);

  breadcrumbs = computed<Breadcrumb[]>(() => {
    const currentProduct = this.product();
    return [
      { name: 'Home', href: PATHS.HOME },
      { name: 'Shop', href: PATHS.SHOP.ROOT },
      {
        name: currentProduct?.name || 'Loading...',
        href: currentProduct ? `/${PATHS.SHOP.ROOT}/${currentProduct.slug}` : `/${PATHS.SHOP.ROOT}`,
      },
    ];
  });

  tabs = computed<Tab[]>(() => [
    {
      id: 0,
      name: 'Product Overview',
      content: this.product()?.description || 'No description available.',
    },
    { id: 1, name: 'Packaging', content: 'We believe that luxury...' },
    { id: 2, name: 'Shipping & Returns', content: 'Global logistics handled with care...' },
  ]);

  readonly sizes = computed(() => {
    return this.product()?.sizes || [];
  });

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.cartService.addItem(p);
    this.cartService.openCart();
  }

  private loadProductData(slug: string) {
    return this.productService.getProductBySlug(slug).pipe(
      tap((foundProduct) => {
        this.product.set(foundProduct);
        this.category.set(foundProduct.category);
        this.title.setTitle(`${foundProduct.name}: Simuero`);
      }),
      catchError((error) => {
        console.error('Ошибка загрузки продукта:', error);
        this.title.setTitle('Product Not Found');
        this.product.set(undefined);
        return of(null);
      }),
      finalize(() => this.isProductLoading.set(false)),
    );
  }
}
