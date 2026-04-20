import { Injectable } from '@angular/core';
import { PATHS } from '../../../core/configs/paths.config';

export interface MenuItem {
  label: string;
  href: string;
  count?: number;
  subItems?: any[];
  description?: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  productCategories = [];
  blogCategories = [];

  menuItems: MenuItem[] = [
    {
      label: 'home',
      href: PATHS.HOME,
      description: 'Welcome to SPADOK...',
      imageUrl:
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop',
    },
    {
      label: 'shop',
      href: PATHS.SHOP.ROOT,
      count: 7,
      subItems: [],
      imageUrl:
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop',
    },
    {
      label: 'blog',
      href: PATHS.BLOG,
      count: 2,
      subItems: [],
      imageUrl:
        'https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?q=80&w=1000&auto=format&fit=crop',
    },
    {
      label: 'about us',
      href: PATHS.ABOUT,
      description: 'We are preserving...',
      imageUrl:
        'https://images.unsplash.com/photo-1525983360072-2eb9cdad617b?q=80&w=1000&auto=format&fit=crop',
    },
    {
      label: 'contacts',
      href: PATHS.CONTACTS,
      description: 'Get in touch...',
      imageUrl:
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop',
    },
  ];
}
