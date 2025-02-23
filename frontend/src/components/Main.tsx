import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";
import { ButtonColour } from "../types/ButtonColor";
import AddPlaceForm from "./AddPlaceForm";
import PlaceList from "./PlaceList";
import PlaceInfo from "./PlaceInfo";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const Main: React.FC<{ authToken: string }> = ({ authToken }) => {
  const [addPlace, viewAddPlace] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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

  const handleAdd = () => {
    viewAddPlace(addPlace ? false : true);
    refetch();
  };

  const MapEvents = () => {
    useMapEvents({
      contextmenu(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        handleAdd();
      },
    });
    return false;
  };

  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <div>
      <div className="flex border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-t-[10px] shadow-md">
        <button
          onClick={() => viewAddPlace(false)}
          className={`flex-1 text-center cursor-pointer px-5 py-3 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden rounded-tl-[10px] ${!addPlace && `${ButtonColour.Blue} text-white`}`}
        >
          Map
        </button>
        <button
          onClick={() => viewAddPlace(true)}
          className={`flex-1 text-center cursor-pointer px-5 py-3 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden rounded-tr-[10px] ${addPlace && `${ButtonColour.Blue} text-white`}`}
        >
          Add Place
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {!addPlace ? (
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
                    <PlaceInfo
                      name={place.name}
                      latitude={place.latitude}
                      longitude={place.longitude}
                      notes={place.notes}
                      deleteFunction={() => handleDelete(place.id)}
                    />
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        ) : (
          <AddPlaceForm
            authToken={authToken}
            initialLatitude={latitude}
            initialLongitude={longitude}
            onPlaceAdd={handleAdd}
          />
        )}
        <PlaceList authToken={authToken} onPlaceDelete={refetch} />
      </div>
    </div>
  );
};

export default Main;
