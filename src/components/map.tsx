"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HeartMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/timeline/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <MapContainer
      center={[21.03, 105.816]}
      zoom={15}
      style={{ height: "1000px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={data} color="red" />
    </MapContainer>
  );
};

export default HeartMap;
