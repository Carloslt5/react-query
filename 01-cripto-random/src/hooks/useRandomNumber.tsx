import { useQuery } from "@tanstack/react-query";

const getRandomNumber = async () => {
  const res = await fetch(
    `https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new`
  );
  const stringNumber = await res.text();
  // throw new Error("Error");
  return +stringNumber;
};

export const useRandomNumber = () => {
  const query = useQuery({
    queryKey: ["randomNumber"],
    queryFn: getRandomNumber,
  });

  return query;
};
