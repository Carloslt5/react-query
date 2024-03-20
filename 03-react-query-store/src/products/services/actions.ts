import { productApi, type Product } from "..";

type GetProductsOptions = {
  filterKey?: string;
};
export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const { data } = await productApi.get<Product[]>("/products");
  return data;
};
