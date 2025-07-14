import type { Product } from "@/domain/repositories/ProductsRepository";
import { createProduct } from "@/domain/usecases/ProductsUseCases";
import { useMutation } from "@tanstack/react-query";

export function useCreateProductMutation() {
  return useMutation({
    mutationFn: (product: Omit<Product, "id">) => createProduct(product),
  });
}
