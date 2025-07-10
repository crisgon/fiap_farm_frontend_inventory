import { request } from "@/infrastructure/api/client";
import type { InventoryMovement } from "../repositories/InventoryMovementsRepository";

export const getInventoryMovements = (): Promise<InventoryMovement[]> => {
  return request<InventoryMovement[]>("GET", "inventory-movements");
};

export const updateInventoryMovement = (
  movement: InventoryMovement
): Promise<InventoryMovement> => {
  return request<InventoryMovement>(
    "PUT",
    `inventory-movements/${movement.uid}`,
    movement
  );
};

export const createInventoryMovement = (
  inventoryMovement: Partial<InventoryMovement>
): Promise<InventoryMovement> => {
  return request<InventoryMovement>(
    "POST",
    "inventory-movements",
    inventoryMovement
  );
};

export const deleteInventoryMovement = (
  movementId: string
): Promise<{ success: boolean }> => {
  return request<{ success: boolean }>(
    "DELETE",
    `inventory-movements/${movementId}`
  );
};
