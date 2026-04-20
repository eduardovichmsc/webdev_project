import { AnyProduct } from './product.model';

export interface OrderItem {
  id: number;
  product_detail: AnyProduct;
  quantity: number;
  created_at: string;
}
