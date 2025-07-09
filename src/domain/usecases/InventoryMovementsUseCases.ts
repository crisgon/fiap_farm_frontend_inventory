import { request } from "@/infrastructure/api/client";
import type { InventoryMovement } from "../repositories/InventoryMovementsRepository";

export const getInventoryMovements = (): Promise<InventoryMovement[]> => {
  return request<InventoryMovement[]>("GET", "inventory-movements");
};

// export const updateProduct = (product: Product): Promise<Product> => {
//   return request<Product>("PUT", `products/${product.uid}`, product);
// };

export const createInventoryMovement = (
  inventoryMovement: Omit<InventoryMovement, "uid">
): Promise<InventoryMovement> => {
  return request<InventoryMovement>(
    "POST",
    "inventory-movements",
    inventoryMovement
  );
};

// export const deleteProduct = (
//   productId: string
// ): Promise<{ success: boolean }> => {
//   return request<{ success: boolean }>("DELETE", `products/${productId}`);
// };
