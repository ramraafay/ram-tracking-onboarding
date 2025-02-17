import React from "react";
import useFetch from "../hooks/useFetch";
import { Place } from "../types/Place";
import Button from "./Button";
import { ButtonColour } from "../types/ButtonColor";

interface PlacesProps {
  authToken: string;
}

const Places: React.FC<PlacesProps> = ({ authToken }) => {
  const { data, loading, error } = useFetch<Place>(
    "http://localhost:8080/places",
    {
      token: authToken,
    },
  );

  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <div className="flex flex-col gap-4">
      <Button
        colour={ButtonColour.Purple}
        onClick={() => console.log(authToken)}
      >
        Print Token
      </Button>
      <Button
        colour={ButtonColour.Purple}
        onClick={() => console.log(error ? ":-(" : ":-)")}
      >
        Check for error
      </Button>
    </div>
  );
};

export default Places;
