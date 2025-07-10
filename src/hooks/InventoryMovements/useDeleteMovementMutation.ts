import { deleteInventoryMovement } from "@/domain/usecases/InventoryMovementsUseCases";
import { useMutation } from "@tanstack/react-query";

export function useDeleteMovementMutation() {
  return useMutation({
    mutationFn: (movementId: string) => deleteInventoryMovement(movementId),
  });
}
