import { request } from "@/infrastructure/api/client";
import type { InventoryMovement } from "../repositories/InventoryMovementsRepository";

export const getInventoryMovements = (): Promise<InventoryMovement[]> => {
  return request<InventoryMovement[]>("GET", "inventory-movements");
};

// export const updateProduct = (product: Product): Promise<Product> => {
//   return request<Product>("PUT", `products/${product.uid}`, product);
// };

// export const createProduct = (
//   product: Omit<Product, "id">
// ): Promise<Product> => {
//   return request<Product>("POST", "products", product);
// };

// export const deleteProduct = (
//   productId: string
// ): Promise<{ success: boolean }> => {
//   return request<{ success: boolean }>("DELETE", `products/${productId}`);
// };
