import { ProductCard, type Product } from "..";
import { usePreFetchProduct } from "../hooks/usePreFetchProduct";

type ProductsProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductsProps) => {
  const { preFetchProduct } = usePreFetchProduct();

  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} preFetchProduct={preFetchProduct} />
      ))}
    </div>
  );
};
