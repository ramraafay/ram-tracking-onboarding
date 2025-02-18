import React from "react";
import useFetch from "../hooks/useFetch";
import { PlaceDTO } from "../types/PlaceDTO";
import Place from "./Place";

const FavouritePlaces: React.FC<{ authToken: string }> = ({ authToken }) => {
  const { data, loading, error } = useFetch<PlaceDTO[]>(
    "http://localhost:8080/places",
    {
      token: authToken,
    },
  );
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
          {data ? (
            data.map((item, index) => (
              <Place
                index={index}
                name={item.name}
                latitude={item.latitude}
                longitude={item.longitude}
              />
            ))
          ) : (
            <Place index={0} name="-" latitude={0} longitude={0} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FavouritePlaces;
