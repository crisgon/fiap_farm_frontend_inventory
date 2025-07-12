import type { Product } from "@/domain/repositories/ProductsRepository";
import { updateProduct } from "@/domain/usecases/ProductsUseCases";
import { useMutation } from "@tanstack/react-query";

export function useUpdateProductMutation() {
  return useMutation({
    mutationFn: (product: Product) => updateProduct(product),
  });
}
