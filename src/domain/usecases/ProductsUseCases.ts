import { request } from "@/infrastructure/api/client";
import type { Product } from "../repositories/ProductsRepository";

export const getProducts = (): Promise<Product[]> => {
  return request<Product[]>("GET", "products");
};

export const updateProduct = (product: Product): Promise<Product> => {
  return request<Product>("PUT", `products/${product.uid}`, product);
};

export const createProduct = (
  product: Omit<Product, "uid">
): Promise<Product> => {
  return request<Product>("POST", "products", product);
};

export const deleteProduct = (
  productId: string
): Promise<{ success: boolean }> => {
  return request<{ success: boolean }>("DELETE", `products/${productId}`);
};
