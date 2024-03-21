import { useParams } from "react-router-dom";
import { ProductCard } from "..";
import { useProduct } from "../hooks/useProduct";

export const ProductByIdPage = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct({ id: +id! });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>
      {isLoading && <h1>Loading...</h1>}
      {product && <ProductCard product={product} fullDescription />}
    </div>
  );
};
