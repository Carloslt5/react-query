import { useEffect, useState } from "react";

const getRandomNumber = async () => {
  const res = await fetch(
    `https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new`
  );
  const stringNumber = await res.text();
  return +stringNumber;
};

export const App = () => {
  const [number, setNumber] = useState<number>();

  useEffect(() => {
    getRandomNumber().then((data) => setNumber(data));
  }, []);

  return <h1>Random number: {number}</h1>;
};
