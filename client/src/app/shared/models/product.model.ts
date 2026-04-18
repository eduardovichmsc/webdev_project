export interface ProductItem {
  id: number;
  slug: string;
  image: string[];
  name: string;
  description?: string;
  categorySlug?: string;
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

export type AnyProduct = ProductItem | Ring | Bracelet;

export interface ProductCategory {
  id: number;
  slug: string;
  name: string;
}
