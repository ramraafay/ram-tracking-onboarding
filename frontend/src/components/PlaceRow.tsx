import { PlaceDTO } from "../types/PlaceDTO";

const PlaceRow: React.FC<{
  index: number;
  place: PlaceDTO;
  deleteFunction: () => void;
}> = ({ index, place, deleteFunction }) => {
  return (
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
          onClick={deleteFunction}
          className="inline-block rounded-[5px] px-5 py-3 text-sm font-medium text-blue-600 transition hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden text-nowrap w-min cursor-pointer"
        >
          View
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
