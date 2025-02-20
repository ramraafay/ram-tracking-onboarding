import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";
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
  const [details, viewDetails] = useState(false);

  const { data, loading, refetch } = useFetch<PlaceDTO[]>(
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
    <div>
      <div className="flex border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-t-[10px] shadow-md">
        <div
          onClick={() => viewDetails(false)}
          className={`flex-1 text-center cursor-pointer px-5 py-3 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden rounded-tl-[10px] ${!details && `${ButtonColour.Blue} text-white`}`}
        >
          Map
        </div>
        <div
          onClick={() => viewDetails(true)}
          className={`flex-1 text-center cursor-pointer px-5 py-3 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden rounded-tr-[10px] ${details && `${ButtonColour.Blue} text-white`}`}
        >
          Details
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {!details ? (
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            className="p-4 bg-white shadow-md"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
            {data &&
              data.map((place) => (
                <Marker
                  key={place.id}
                  position={[place.latitude, place.longitude]}
                >
                  <Popup>
                    <div>
                      <div className="flex items-center px-5 py-3 border-b border-gray-200  text-left text-xs font-semibold text-gray-600 tracking-wider">
                        <span className="w-1/5">{place.id}</span>
                      </div>
                      <div className="flex items-center px-5 py-3 border-b border-gray-200  text-left text-xs font-semibold text-gray-600 tracking-wider">
                        <span className="w-1/5">{place.name}</span>
                      </div>
                      <div className="flex items-center px-5 py-3 border-b border-gray-200  text-left text-xs font-semibold text-gray-600  tracking-wider">
                        <span className="w-1/5">{place.latitude}</span>
                      </div>
                      <div className="flex items-center px-5 py-3 border-b border-gray-200  text-left text-xs font-semibold text-gray-600  tracking-wider">
                        <span className="w-1/5">{place.longitude}</span>
                      </div>
                      <div className="flex justify-center py-3">
                        <button
                          className={`inline-block rounded-[5px] ${ButtonColour.Red} px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus:ring-3 focus:outline-hidden text-nowrap w-full`}
                          onClick={() => handleDelete(place.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        ) : (
          <AddPlace authToken={authToken} />
        )}
        <FavouritePlaces authToken={authToken} />
      </div>
    </div>
  );
};

export default Places;
