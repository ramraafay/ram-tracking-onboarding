import React from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";
import PlaceRow from "./PlaceRow";

const PlaceList: React.FC<{
  authToken: string;
  onPlaceDelete: () => void;
}> = ({ authToken, onPlaceDelete }) => {
  const { data, refetch } = useFetch<PlaceDTO[]>(
    "http://localhost:8080/places",
    {
      token: authToken,
    },
  );

  const handleUpdate = async (place: PlaceDTO) => {
    try {
      const response = await fetch(`http://localhost:8080/places/${place.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(place),
      });

      if (response.ok) {
        console.log("Update successful");
        refetch();
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error during update request", error);
    }
  };

  const handleDelete = async (place: PlaceDTO) => {
    try {
      const response = await fetch(`http://localhost:8080/places/${place.id}`, {
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
    onPlaceDelete();
  };

  return (
    <div className="rounded-[10px] bg-white shadow-md overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Latitude
            </th>
            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Longitude
            </th>
            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((place, index) => (
              <PlaceRow
                index={index}
                place={place}
                deleteFunction={() => handleDelete(place)}
                updateFunction={() => handleUpdate(place)}
              />
            ))
          ) : (
            <tr>
              <td
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                colSpan={5}
              >
                you've not been anywhere!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlaceList;
