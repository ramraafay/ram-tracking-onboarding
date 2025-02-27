import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterAutomatically: React.FC<{
  latitude: number;
  longitude: number;
}> = ({ latitude, longitude }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude]);
  }, [latitude, longitude, map]);
  return null;
};

export default RecenterAutomatically;
