import { ProductList, useProducts } from "..";

export const CompleteListPage = () => {
  const { products, isLoading } = useProducts({});

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>
      <ProductList products={products} />
    </div>
  );
};
