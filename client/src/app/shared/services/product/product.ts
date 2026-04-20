import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../core/environments/environment';
import { PaginatedResponse } from '../../models/api.model';
import { AnyProduct } from '../../models/product.model';
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
    ordering: string = '-created_at',
  ): Observable<PaginatedResponse<AnyProduct>> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset)
      .set('ordering', ordering);

    if (categorySlug && categorySlug !== 'all') {
      params = params.set('category', categorySlug);
    }

    return this.http.get<PaginatedResponse<AnyProduct>>(`${environment.apiUrl}/products/`, {
      params,
    });

    // let filteredProducts = products;
    // if (categorySlug && categorySlug !== 'all' && categorySlug !== '') {
    //   filteredProducts = products.filter((p) => p.categorySlug === categorySlug);
    // }
    // const paginatedProducts = filteredProducts.slice(offset, offset + limit);
    // const mockResponse: PaginatedResponse<AnyProduct> = {
    //   count: filteredProducts.length,
    //   next: null,
    //   previous: null,
    //   results: paginatedProducts,
    // };
    // return of(mockResponse).pipe(delay(400));
  }

  getProductBySlug(slug: string): Observable<AnyProduct> {
    return this.http.get<AnyProduct>(`${environment.apiUrl}/products/${slug}/`);

    // const product = products.find((p) => p.slug === slug) as AnyProduct;
    // return of(product).pipe(delay(400));
  }

  getProductCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/products/categories/`);

    // const categoriesWithoutAll = productCategories.filter((c) => c.slug !== '');
    // return of(categoriesWithoutAll).pipe(delay(400));
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/products/categories/${slug}/`);

    // const category = productCategories.find((c) => c.slug === slug) as Category;
    // return of(category).pipe(delay(400));
  }
}
