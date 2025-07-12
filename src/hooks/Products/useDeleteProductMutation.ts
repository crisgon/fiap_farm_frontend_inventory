import { deleteProduct } from "@/domain/usecases/ProductsUseCases";
import { useMutation } from "@tanstack/react-query";

export function useDeleteProductMutation() {
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
  });
}
