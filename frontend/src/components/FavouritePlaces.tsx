import React from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";

const FavouritePlaces: React.FC<{ authToken: string }> = ({ authToken }) => {
  const { data, loading, error } = useFetch<PlaceDTO[]>(
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
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error during delete request", error);
    }
  };

  return (
    <div className="rounded bg-white shadow-md overflow-hidden">
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
            <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.latitude}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.longitude}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    className="text-red-600 hover:text-black"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
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

export default FavouritePlaces;
