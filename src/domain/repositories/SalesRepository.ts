import type { Product } from "./ProductsRepository";

export interface Sale {
  uid?: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  saleDate: Date;
  userId: string;
  unitPrice: number;
  createdAt?: Date;
  status?: SaleStatus;
  product: Product;
}

export const SaleStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
  FAILED: "FAILED",
} as const;

export type SaleStatus = (typeof SaleStatus)[keyof typeof SaleStatus];
