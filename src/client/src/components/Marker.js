import { Marker, useMapEvents } from "react-leaflet";
import { postMarker } from "../api/locationApi";
import { StyledPopup } from "./Popup";

export const AddMarkerToClick = ({ markers, setMarkers, refetch }) => {
  const map = useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      await postMarker(lat, lng);
      refetch();
    },
  });

  return (
    <>
      {markers.map((marker) => {
        return (
          <Marker position={[marker.latitude, marker.longitude]}>
            <StyledPopup marker={marker} refetch={refetch} />
          </Marker>
        );
      })}
    </>
  );
};
