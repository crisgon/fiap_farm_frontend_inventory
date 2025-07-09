import type { Product } from "./ProductsRepository";

export interface Production {
  uid: string;
  productId: string;
  area: number;
  quantityExpected: number;
  quantityHarvested: number;
  status?: StatusProduction;
  plantingDate: Date;
  harvestDate?: Date;
  userId: number;
  createdAt: Date;
  cost: number;
  product: Product;
}

export enum StatusProduction {
  WAITING = "WAITING",
  IN_PROGRESS = "IN_PROGRESS",
  HARVESTED = "HARVESTED",
}
