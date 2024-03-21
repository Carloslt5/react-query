import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useMutationProduct = () => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: productActions.createProduct,

    onMutate: (product) => {
      //Optimistic product
      const optimisticProduct = { id: Math.random(), ...product };

      //Store product in query client cache
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [optimisticProduct];
          return [...oldData, optimisticProduct];
        }
      );
      return { optimisticProduct };
    },

    onSuccess: (product, _variables, context) => {
      // //Invalidate Query
      // queryClient.invalidateQueries({ queryKey: ["products", { filterKey: data.category }] });

      queryClient.removeQueries({ queryKey: ["product", context?.optimisticProduct.id] });
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product];
          return oldData.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id ? product : cacheProduct;
          });
        }
      );
    },
  });

  return {
    productMutation,
  };
};
