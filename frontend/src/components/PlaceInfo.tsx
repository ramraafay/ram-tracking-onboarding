import React from "react";
import { ButtonColour } from "../types/ButtonColor";

const PlaceInfo: React.FC<{
  name: string;
  latitude: number;
  longitude: number;
  notes: string;
  deleteFunction: () => void;
}> = ({ name, latitude, longitude, notes, deleteFunction }) => {
  return (
    <div>
      <div className="flex items-center px-5 py-3 border-b border-gray-200 text-left text-lg font-semibold text-gray-600 tracking-wider">
        <span className="w-1/5">{name}</span>
      </div>
      <div className="flex items-center px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600  tracking-wider">
        <span className="w-1/5">{latitude}</span>
      </div>
      <div className="flex items-center px-5 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600  tracking-wider">
        <span className="w-1/5">{longitude}</span>
      </div>
      {notes && (
        <div className="flex items-center px-5 py-3 border-b border-gray-200 text-left text-xs font-normal text-gray-600">
          <span className="w-1/5">{notes}</span>
        </div>
      )}
      <div className="flex justify-center py-3">
        <button
          className={`inline-block rounded-[5px] ${ButtonColour.Red} px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus:ring-3 focus:outline-hidden text-nowrap w-full`}
          onClick={deleteFunction}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlaceInfo;
