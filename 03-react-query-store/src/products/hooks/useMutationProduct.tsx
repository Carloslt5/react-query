import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productActions } from "..";

export const useMutationProduct = () => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products", { filterKey: data.category }] });
    },
  });

  return {
    productMutation,
  };
};
