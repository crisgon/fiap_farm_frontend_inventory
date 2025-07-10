import type { InventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import { createInventoryMovement } from "@/domain/usecases/InventoryMovementsUseCases";
import { useMutation } from "@tanstack/react-query";

export function useCreateInventoryMovementMutation() {
  return useMutation({
    mutationFn: (inventoryMovement: Partial<InventoryMovement>) =>
      createInventoryMovement(inventoryMovement),
  });
}
