import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../core/environments/environment';
import { OrderItem } from '../../models/order.model';
import { PaginatedResponse } from '../../models/api.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderItem[]> {
    return this.http
      .get<PaginatedResponse<OrderItem> | OrderItem[]>(`${this.base}/`)
      .pipe(
        map((res: any) =>
          Array.isArray(res) ? res : (res?.results ?? []),
        ),
      );
  }

  addToCart(productId: number, quantity = 1): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.base}/`, {
      product_id: productId,
      quantity,
    });
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }
}
