import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer implements OnInit {
  constructor(private productService: ProductService) {}

  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: () => {},
    });
  }

  helpLinks = [
    { name: 'Shipping' },
    { name: 'Returns & Exchanges' },
    { name: 'Size Guide' },
    { name: 'FAQ' },
    { name: 'Contact us' },
  ];

  legalLinks = ['Privacy Notice', 'Cookie Policy', 'Privacy Policy'];
}
