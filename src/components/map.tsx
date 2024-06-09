"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
interface Coordinate {
  lat: number;
  lng: number;
}

const calculateCenter = (coordinates: Coordinate[]): [number, number] => {
  const latSum = coordinates.reduce((sum, point) => sum + point.lat, 0);
  const lngSum = coordinates.reduce((sum, point) => sum + point.lng, 0);
  const latCenter = latSum / coordinates.length;
  const lngCenter = lngSum / coordinates.length;
  return [latCenter, lngCenter];
};
const UpdateMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const HeartMap = ({ src }: { src?: string }) => {
  const [data, setData] = useState<Coordinate[] | undefined>();
  const [center, setCenter] = useState<[number, number]>();
  useEffect(() => {
    if (src) {
      fetch(`/api/timeline/${src}`)
        .then((response) => response.json())
        .then((data: Coordinate[]) => {
          setData(data);
          if (data.length > 0) {
            setCenter(calculateCenter(data));
          }
        });
    }
  }, [src]);
  if (!data || !center || Number.isNaN(center[0])) {
    return null;
  }

  console.log("center: ", center);

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "1000px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <UpdateMapCenter center={center} />

      <Polyline positions={data} color="red" />
    </MapContainer>
  );
};

export default HeartMap;
