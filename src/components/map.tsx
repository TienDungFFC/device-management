"use client";
import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (src && typeof window !== "undefined") {
      setLoading(true);
      fetch(`/api/timeline/${src}`)
        .then((response) => response.json())
        .then((data: Coordinate[]) => {
          setData(data);
          if (data.length > 0) {
            setCenter(calculateCenter(data));
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [src]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader"></div>
      </div>
    );
  }

  if (!data || !center || Number.isNaN(center[0])) {
    return <div>No timelines found</div>;
  }

  return (
    <MapContainer
      center={center}
      zoom={15}
      className="w-full h-[calc(100vh-110px)] rounded-lg"
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
