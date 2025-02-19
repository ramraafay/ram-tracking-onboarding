import React, { useState } from "react";
import { PlaceDTO } from "../types/PlaceDTO";

const AddPlace: React.FC<{ authToken: string }> = ({ authToken }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const place: PlaceDTO = {
    name: name,
    latitude: Number(latitude),
    longitude: Number(longitude),
  };

  const post = async () => {
    try {
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
          onChange={(e) => {
            const value = e.target.value;
            if (/^-?\d*\.?\d*$/.test(value)) {
              setLatitude(value);
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter latitude"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Longitude</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => {
            const value = e.target.value;
            if (/^-?\d*\.?\d*$/.test(value)) {
              setLongitude(value);
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter longitude"
        />
      </div>
      <button
        onClick={post}
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Place
      </button>
    </div>
  );
};

export default AddPlace;
