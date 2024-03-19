import { useEffect, useReducer, useState } from "react";

const getRandomNumber = async () => {
  const res = await fetch(
    `https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new`
  );
  const stringNumber = await res.text();
  // throw new Error("Error");
  return +stringNumber;
};

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumber()
      .then((data) => setNumber(data))
      .catch((error) => setError(error.message));
  }, [key]);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  return (
    <div className="container">
      {isLoading ? <h1>Loading...</h1> : <h1>Random number: {number}</h1>}
      {!isLoading && error && <h3>{error}</h3>}

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? `....` : `New number`}
      </button>
    </div>
  );
};
