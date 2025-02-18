import React from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";
import Button from "./Button";
import { ButtonColour } from "../types/ButtonColor";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import FavouritePlaces from "./FavouritePlaces";
import AddPlace from "./AddPlace";

interface PlacesProps {
  authToken: string;
}

const Places: React.FC<PlacesProps> = ({ authToken }) => {
  const { data, loading, error } = useFetch<PlaceDTO>(
    "http://localhost:8080/places",
    {
      token: authToken,
    },
  );

  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <div className="flex flex-col gap-4">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
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
      <AddPlace authToken={authToken} />
      <FavouritePlaces authToken={authToken} />
    </div>
  );
};

export default Places;
