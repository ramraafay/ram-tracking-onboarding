import React from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";
import Button from "./Button";
import { ButtonColour } from "../types/ButtonColor";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import FavouritePlaces from "./FavouritePlaces";
import AddPlace from "./AddPlace";

interface PlacesProps {
  authToken: string;
}

const Places: React.FC<PlacesProps> = ({ authToken }) => {
  const { data, loading, error, refetch } = useFetch<PlaceDTO[]>(
    "http://localhost:8080/places",
    {
      token: authToken,
    },
  );

  const handleDelete = async (id?: number) => {
    try {
      const response = await fetch(`http://localhost:8080/places/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log("Delete successful");
        refetch();
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error during delete request", error);
    }
  };

  const post = async (latitude: number, longitude: number) => {
    try {
      const place: PlaceDTO = {
        name: "test",
        latitude: latitude,
        longitude: longitude,
      };
      const response = await fetch("http://localhost:8080/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(place),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      contextmenu(e) {
        post(e.latlng.lat, e.latlng.lng);
        refetch();
      },
    });
    return false;
  };

  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <div className="flex flex-col gap-4">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        {data &&
          data.map((place) => (
            <Marker key={place.id} position={[place.latitude, place.longitude]}>
              <Popup>
                {place.name}
                <Button
                  colour={ButtonColour.Red}
                  onClick={() => handleDelete(place.id)}
                >
                  Delete
                </Button>
              </Popup>
            </Marker>
          ))}
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
      <Button colour={ButtonColour.Purple} onClick={() => console.log(data)}>
        Print Data
      </Button>
      <AddPlace authToken={authToken} />
      <FavouritePlaces authToken={authToken} />
    </div>
  );
};

export default Places;
