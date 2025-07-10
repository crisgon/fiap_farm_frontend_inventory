import type { InventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import { updateInventoryMovement } from "@/domain/usecases/InventoryMovementsUseCases";
import { useMutation } from "@tanstack/react-query";

export function useUpdateInventoryMovementMutation() {
  return useMutation({
    mutationFn: (movement: InventoryMovement) =>
      updateInventoryMovement(movement),
  });
}
