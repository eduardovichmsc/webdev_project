import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { CartDrawer } from './shared/components/cart-drawer/cart-drawer';
import { Footer } from './shared/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CartDrawer, Footer],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('simuero_prpr');
}
