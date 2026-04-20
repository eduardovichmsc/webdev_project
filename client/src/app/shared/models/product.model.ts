import { Category } from './category.model';

export interface ProductItem {
  id: number;
  slug: string;
  image: string[];
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface Ring extends ProductItem {
  sizes: number[];
  material: string;
}

export interface Bracelet extends ProductItem {
  length: number;
  hasCharm: boolean;
}

// export type AnyProduct = ProductItem | Ring | Bracelet;

export interface ProductCategory {
  id: number;
  slug: string;
  name: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
  order: number;
}

export interface AnyProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  category: Category;
  material: string;
  sizes: number[];
  length: number | null;
  has_charm: boolean;
  is_active: boolean;
  created_at: string;
  images: ProductImage[];
}
