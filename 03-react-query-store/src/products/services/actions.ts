import { productApi, type Product } from "..";
import { ProductLike } from "../types/product";

type GetProductsOptions = {
  filterKey?: string;
};

const sleep = (seconds: number = 1): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({ filterKey }: GetProductsOptions): Promise<Product[]> => {
  await sleep(2);
  const filerUrl = filterKey ? `category=${filterKey}` : "";

  const { data } = await productApi.get<Product[]>(`/products?${filerUrl}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  await sleep(2);

  const { data } = await productApi.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: ProductLike): Promise<Product> => {
  await sleep(2);
  const { data } = await productApi.post<Product>("/products", product);
  return data;
};
