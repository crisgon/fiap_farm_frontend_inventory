import type { Product } from "./ProductsRepository";

export interface InventoryMovement {
  uid?: string;
  productId: string;
  type: TypeInventoryMovement;
  quantity: number;
  source: SourceInventoryMovement;
  referenceId: string;
  createdAt?: Date;
  product?: Product;
}

export const SourceInventoryMovement = {
  SALE: "SALE",
  PRODUCTION: "PRODUCTION",
} as const;

export type SourceInventoryMovement =
  (typeof SourceInventoryMovement)[keyof typeof SourceInventoryMovement];

export const TypeInventoryMovement = {
  ENTRY: "ENTRY",
  EXIT: "EXIT",
} as const;

export type TypeInventoryMovement =
  (typeof TypeInventoryMovement)[keyof typeof TypeInventoryMovement];
