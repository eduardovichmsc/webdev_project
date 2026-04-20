import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
})
export class CartDrawer {
  readonly parseFloat = parseFloat;

  constructor(
    public cartService: CartService,
    public authService: AuthService,
  ) {}
}
