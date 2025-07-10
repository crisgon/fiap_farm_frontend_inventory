import { request } from "@/infrastructure/api/client";
import type { Sale } from "../repositories/SalesRepository";

export const getSales = (): Promise<Sale[]> => {
  return request<Sale[]>("GET", "sales");
};
