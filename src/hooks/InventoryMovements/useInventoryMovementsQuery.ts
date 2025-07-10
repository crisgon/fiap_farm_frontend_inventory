import { getInventoryMovements } from "@/domain/usecases/InventoryMovementsUseCases";
import { useQuery } from "@tanstack/react-query";

export function useInventoryMovementsQuery() {
  return useQuery({
    queryKey: ["inventory-movements"],
    queryFn: () => getInventoryMovements(),
  });
}
