import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductCategory } from '../../models/product.model';
import { MenuItem, MenuService } from '../../services/menu/menu';
import { ProductService } from '../../services/product/product';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  constructor(
    private menuService: MenuService,
    private router: Router,
    private productService: ProductService,
  ) {
    this.menuItems = this.menuService.menuItems;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  menuItems: MenuItem[] = [];
  currentUrl: string = '/';

  whitePages = ['/', '/blog'];

  isMenuOpen = false;
  isScrolled = false;
  isVisible = true;
  lastScrollTop = 0;

  activeItem: MenuItem | null = null;
  expandedItem: MenuItem | null = null;

  get isWhitePage(): boolean {
    return this.whitePages.includes(this.currentUrl);
  }

  ngOnInit() {
    this.activeItem = this.menuItems[1];
    this.expandedItem = this.menuItems[1];

    this.productService.getProductCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        const shopItem = this.menuItems.find((item) => item.label.toLowerCase() === 'shop');

        if (shopItem) {
          const realCategories = categories.filter((c) => c.slug !== '');

          shopItem.subItems = realCategories.map((c) => ({
            name: c.name,
            slug: c.slug,
          }));

          shopItem.count = realCategories.length;
        }
      },
      error: (err) => console.error('Ошибка загрузки категорий для меню', err),
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    this.isScrolled = st > 100;

    if (this.isMenuOpen) return;

    if (st > this.lastScrollTop && st > 100) {
      this.isVisible = false;
    } else if (st < this.lastScrollTop) {
      this.isVisible = true;
    }

    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isVisible = true;
    document.body.style.overflowY = this.isMenuOpen ? 'hidden' : 'scroll';
  }

  setActiveItem(item: MenuItem) {
    this.activeItem = item;
    if (item.subItems && item.subItems.length > 0) {
      this.expandedItem = item;
    }
  }
}
