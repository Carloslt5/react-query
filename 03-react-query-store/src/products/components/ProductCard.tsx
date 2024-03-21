import { Card, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Product } from "..";

type ProductCardProps = {
  product: Product;
  fullDescription?: boolean;
};

export const ProductCard = ({ product, fullDescription = false }: ProductCardProps) => {
  const { id, image, category, title, description, price } = product;

  return (
    <Link to={`/product/${id}`}>
      <Card className="relative h-full flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
          <Image
            src={image}
            alt="tailwind logo"
            width={300}
            height={400}
            className="rounded-xl p-5 sm:p-0 bg-white"
          />
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col gap-2 p-3 ">
          <div className="flex justify-between item-center">
            <p className="text-gray-500 font-medium hidden md:block">{category}</p>
          </div>
          <h3 className="font-black text-gray-800  text-xl">{title}</h3>

          <p className="md:text-lg text-gray-500 text-base">
            {fullDescription ? description : description.slice(0, 50) + `...`}
          </p>

          <p className="text-xl font-black text-gray-800 mt-auto">
            {price}
            <span className="font-normal text-gray-600 text-base"> +impuesto</span>
          </p>
        </div>
      </Card>
    </Link>
  );
};
