import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";

const AddPlace: React.FC<{ authToken: string }> = ({ authToken }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { data, loading, error } = useFetch<PlaceDTO[]>(
    "http://localhost:8080/places",
    {
      token: authToken,
    },
  );

  const handleSubmit = () => {
    console.log({ name, latitude, longitude });
    // Add your logic to handle the data here
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add a New Place</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Place Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter place name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Latitude</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter latitude"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Longitude</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter longitude"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Place
      </button>
    </div>
  );
};

export default AddPlace;
