import { getProductions } from "@/domain/usecases/ProductionsUseCases";
import { useQuery } from "@tanstack/react-query";

export function useProductionsQuery() {
  return useQuery({
    queryKey: ["productions"],
    queryFn: () => getProductions(),
  });
}
