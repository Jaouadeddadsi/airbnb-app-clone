"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import marker2xpng from "leaflet/dist/images/marker-icon-2x.png";
import markerpng from "leaflet/dist/images/marker-icon.png";
import markerShadowpng from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2xpng.src,
  iconUrl: markerpng.src,
  shadowUrl: markerShadowpng.src,
});

interface MapProps {
  center?: [number, number] | null;
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      className="h-[35vh] rounded-lg"
      center={center ? center : [6, 0]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center}></Marker>}
    </MapContainer>
  );
};

export default Map;
