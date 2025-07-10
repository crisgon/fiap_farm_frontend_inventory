import type { InventoryMovement } from "@/domain/repositories/InventoryMovementsRepository";
import type {
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";

export interface TabsProps {
  data?: InventoryMovement[];
  isLoading: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<InventoryMovement[], Error>>;
}
