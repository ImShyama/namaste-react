import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log("err", err);
  return (
    <div className="div_center">
      <div>
        <h1>Oops!</h1>
        <h2>Somethings went wrong!!</h2>
        <h3>
          {err?.status}: {err?.statusText}
        </h3>
        <p>{err.error?.message}</p>
      </div>
    </div>
  );
};

export default Error;
