import { Product } from "./product";
export interface Order {
  id: number;
  user: number;
  total_price: number;
  customer: string;
  service_price: number;
  created_at: string;
  order_products: Product[];
  is_paid: boolean;
}
