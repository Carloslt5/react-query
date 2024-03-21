import { useQueryClient } from "@tanstack/react-query";
import { productActions } from "..";

export const usePreFetchProduct = () => {
  const queryClient = useQueryClient();

  const preFetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["products", id],
      queryFn: () => productActions.getProductById(id),
    });
  };

  return { preFetchProduct };
};
