import { MapContainer, TileLayer } from "react-leaflet";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getMarkers } from "../api/locationApi";
import { AddMarkerToClick } from "./Marker";

export const WorldMap = () => {
  const { isLoading, data, refetch } = useQuery("markers", () => getMarkers().then((resp) => resp.data));
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      setMarkers(markers);
    }
  }, [isLoading]);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div style={{ alignItems: "center", alignSelf: "center" }}>
      <MapContainer center={[19.4100819, -99.1630388]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick markers={data} setMarkers={setMarkers} refetch={refetch} />
      </MapContainer>
    </div>
  );
};
