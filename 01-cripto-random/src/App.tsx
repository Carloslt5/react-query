import { useRandomNumber } from "./hooks/useRandomNumber";

export const App = () => {
  const query = useRandomNumber();

  return (
    <div className="container">
      {query.isFetching ? <h1>Loading...</h1> : <h1>Random number: {`${query.data}`}</h1>}
      {!query.isLoading && query.isError && <h3>{`${query.error}`}</h3>}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? `....` : `New number`}
      </button>
    </div>
  );
};
