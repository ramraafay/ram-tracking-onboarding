import React, { useState } from "react";
import { PlaceDTO } from "../types/PlaceDTO";
import { ButtonColour } from "../types/ButtonColor";

const AddPlaceForm: React.FC<{
  authToken: string;
  initialLatitude: number;
  initialLongitude: number;
  onPlaceAdd: () => void;
}> = ({ authToken, initialLatitude, initialLongitude, onPlaceAdd }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [notes, setNotes] = useState("");

  const place: PlaceDTO = {
    name: name,
    latitude: Number(latitude ? latitude : initialLatitude),
    longitude: Number(longitude ? longitude : initialLongitude),
    notes: notes,
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
    onPlaceAdd();
  };

  return (
    <div className="p-4 bg-white rounded-b-[10px] shadow-md w-full h-[50vh] flex flex-col justify-between">
      <div className="mb-4 flex flex-col h-full">
        <label className="block text-sm font-medium mb-2">Place Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-[10px]"
          placeholder="Enter place name"
        />
      </div>
      <div className="mb-4 flex flex-row h-full space-x-4">
        <div className="flex flex-col flex-1">
          <label className="block text-sm font-medium mb-2">Latitude</label>
          <input
            type="text"
            placeholder={String(initialLatitude)}
            defaultValue={initialLatitude}
            value={latitude}
            onChange={(e) => {
              const value = e.target.value;
              if (/^-?\d*\.?\d*$/.test(value)) {
                setLatitude(value);
              }
            }}
            className="flex-grow p-2 border border-gray-300 rounded-[10px]"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="block text-sm font-medium mb-2">Longitude</label>
          <input
            type="text"
            placeholder={String(initialLongitude)}
            defaultValue={initialLongitude}
            value={longitude}
            onChange={(e) => {
              const value = e.target.value;
              if (/^-?\d*\.?\d*$/.test(value)) {
                setLongitude(value);
              }
            }}
            className="flex-grow p-2 border border-gray-300 rounded-[10px]"
          />
        </div>
      </div>
      <div className="mb-4 flex flex-col h-full">
        <label className="block text-sm font-medium mb-2">Notes</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-[10px]"
          placeholder="e.g. reason for visit, opening times"
        />
      </div>
      <button
        onClick={post}
        className={`inline-block rounded-[5px] ${ButtonColour.Blue} px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus:ring-3 focus:outline-hidden text-nowrap w-full`}
      >
        Add
      </button>
    </div>
  );
};

export default AddPlaceForm;
