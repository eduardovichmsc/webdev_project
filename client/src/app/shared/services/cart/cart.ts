import { computed, effect, Injectable, signal } from '@angular/core';
import { OrderItem } from '../../models/order.model';
import { AnyProduct } from '../../models/product.model';
import { OrderService } from '../order/order';
import { AuthService } from '../auth/auth';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<OrderItem[]>([]);
  private _isOpen = signal(false);
  private _isLoading = signal(false);

  readonly items = this._items.asReadonly();
  readonly isOpen = this._isOpen.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly cartCount = computed(() =>
    this._items().reduce((sum, i) => sum + (i.quantity || 0), 0),
  );

  readonly cartTotal = computed(() =>
    this._items().reduce(
      (sum, i) => sum + parseFloat(i.product_detail.price) * i.quantity,
      0,
    ),
  );

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) {
    // Load cart whenever auth state changes
    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.loadCart();
      } else {
        this._items.set([]);
      }
    });
  }

  openCart(): void {
    this._isOpen.set(true);
    document.body.style.overflowY = 'hidden';
  }

  closeCart(): void {
    this._isOpen.set(false);
    document.body.style.overflowY = 'scroll';
  }

  toggleCart(): void {
    this.isOpen() ? this.closeCart() : this.openCart();
  }

  loadCart(): void {
    if (!this.authService.isLoggedIn()) return;
    this._isLoading.set(true);
    this.orderService.getOrders().subscribe({
      next: (items) => this._items.set(items),
      error: (err) => {
        console.error('Cart load error', err);
        this._items.set([]);
      },
      complete: () => this._isLoading.set(false),
    });
  }

  addItem(product: AnyProduct): void {
    const current = this._items();
    const existing = current.find((i) => i.product_detail.id === product.id);

    if (existing) {
      // Optimistically increment quantity
      this._items.set(
        current.map((i) =>
          i.product_detail.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      );
      this.orderService.addToCart(product.id, 1).subscribe({
        error: () => this.loadCart(), // revert on error
      });
    } else {
      // Build a temporary optimistic item immediately
      const tempId = -Date.now();
      const optimisticItem: OrderItem = {
        id: tempId,
        product_detail: product,
        quantity: 1,
        created_at: new Date().toISOString(),
      };
      this._items.set([...current, optimisticItem]);

      this.orderService.addToCart(product.id, 1).subscribe({
        next: (realItem) => {
          // Replace temp item with the real server item
          this._items.set(
            this._items().map((i) => (i.id === tempId ? realItem : i)),
          );
        },
        error: () => {
          // Revert optimistic item
          this._items.set(this._items().filter((i) => i.id !== tempId));
          console.error('Add to cart error');
        },
      });
    }
  }

  removeItem(orderItemId: number): void {
    this.orderService.removeFromCart(orderItemId).subscribe({
      next: () =>
        this._items.set(this._items().filter((i) => i.id !== orderItemId)),
      error: (err) => console.error('Remove from cart error', err),
    });
  }

  increaseQuantity(item: OrderItem): void {
    this._items.set(
      this._items().map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
    this.orderService.addToCart(item.product_detail.id, 1).subscribe({
      error: () => this.loadCart(),
    });
  }

  decreaseQuantity(item: OrderItem): void {
    if (item.quantity <= 1) {
      this.removeItem(item.id);
      return;
    }
    this._items.set(
      this._items().map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    );
  }
}
