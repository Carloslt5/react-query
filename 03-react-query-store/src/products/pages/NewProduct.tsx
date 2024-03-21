import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutationProduct } from "../hooks/useMutationProduct";

type FormInputs = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
const templateImage =
  "https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg";

export const NewProduct = () => {
  const { productMutation } = useMutationProduct();
  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Chaqueta",
      price: 0,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quibusdam eaque rerum est repudiandae similique veritatis fugiat! Et, delectus! Necessitatibus!",
      category: "men's clothing",
      image: "https://kaurifactory.com/wp-content/uploads/2021/04/mockup-sudadera-c.png",
    },
  });

  const newImage = watch("image") || templateImage;

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center gap-2">
          <div className="flex-col  flex-1">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(+e.target.value)}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripcion del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Loading..." : "Crear"}
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-3 flex-1 flex justify-center items-center h-[400px]">
            <Image src={newImage} width={380} height={380} />
          </div>
        </div>
      </form>
    </div>
  );
};
