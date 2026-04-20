import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../core/environments/environment';
import { PaginatedResponse } from '../../models/api.model';
import { AnyProduct } from '../../models/product.model';
import { productCategories, products } from '../../../data/mock';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(
    categorySlug?: string,
    limit: number = 6,
    offset: number = 0,
  ): Observable<PaginatedResponse<AnyProduct>> {
    let filteredProducts = products;
    if (categorySlug && categorySlug !== 'all' && categorySlug !== '') {
      filteredProducts = products.filter((p) => p.categorySlug === categorySlug);
    }
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);
    const mockResponse: PaginatedResponse<AnyProduct> = {
      count: filteredProducts.length,
      next: null,
      previous: null,
      results: paginatedProducts,
    };
    return of(mockResponse).pipe(delay(400));
  }

  getProductBySlug(slug: string): Observable<AnyProduct> {
    const product = products.find((p) => p.slug === slug) as AnyProduct;
    return of(product).pipe(delay(400));
  }

  getProductCategories(): Observable<Category[]> {
    const categoriesWithoutAll = productCategories.filter((c) => c.slug !== '');
    return of(categoriesWithoutAll).pipe(delay(400));
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    const category = productCategories.find((c) => c.slug === slug) as Category;
    return of(category).pipe(delay(400));
  }
}
