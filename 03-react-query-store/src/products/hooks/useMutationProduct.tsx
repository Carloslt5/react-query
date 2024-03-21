import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useMutationProduct = () => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (data) => {
      // //Invalidate Query
      // queryClient.invalidateQueries({ queryKey: ["products", { filterKey: data.category }] });

      queryClient.setQueryData<Product[]>(["products", { filterKey: data.category }], (oldData) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });
    },
  });

  return {
    productMutation,
  };
};
