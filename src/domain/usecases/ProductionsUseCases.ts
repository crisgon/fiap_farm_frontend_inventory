import { request } from "@/infrastructure/api/client";
import type { Production } from "../repositories/ProductionsRepository";

export const getProductions = (): Promise<Production[]> => {
  return request<Production[]>("GET", "productions");
};
