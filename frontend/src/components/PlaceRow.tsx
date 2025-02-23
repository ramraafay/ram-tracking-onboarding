import { useState } from "react";
import { PlaceDTO } from "../types/PlaceDTO";

const PlaceRow: React.FC<{
  index: number;
  place: PlaceDTO;
  deleteFunction: () => void;
  updateFunction: () => void;
}> = ({ index, place, deleteFunction, updateFunction }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [notes, setNotes] = useState("");

  return !editMode ? (
    <tr key={index}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
        {place.id}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {place.name}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {place.latitude}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {place.longitude}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <button
          onClick={() => setEditMode(true)}
          className="inline-block rounded-[5px] px-5 py-3 text-sm font-medium text-blue-600 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden text-nowrap w-min cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={deleteFunction}
          className="inline-block rounded-[5px] px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden text-nowrap w-min cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  ) : (
    <tr key={index}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
        {place.id}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={place.name}
          className="w-full p-2 border border-gray-300 rounded-[10px]"
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <input
          type="text"
          placeholder={String(place.latitude)}
          defaultValue={place.latitude}
          value={latitude}
          onChange={(e) => {
            const value = e.target.value;
            if (/^-?\d*\.?\d*$/.test(value)) {
              setLatitude(value);
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-[10px]"
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <input
          type="text"
          placeholder={String(place.longitude)}
          defaultValue={place.longitude}
          value={longitude}
          onChange={(e) => {
            const value = e.target.value;
            if (/^-?\d*\.?\d*$/.test(value)) {
              setLongitude(value);
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-[10px]"
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <button
          onClick={() => {
            setEditMode(false);
            updateFunction();
            console.log(place);
          }}
          className="inline-block rounded-[5px] px-5 py-3 text-sm font-medium text-green-600 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden text-nowrap w-min cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={deleteFunction}
          className="inline-block rounded-[5px] px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden text-nowrap w-min cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PlaceRow;
