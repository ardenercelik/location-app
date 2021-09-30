import { useState } from "react";
import { Popup } from "react-leaflet";
import { deleteMarker, updateMarker } from "../api/locationApi";
import { useForm } from "react-hook-form";
export const StyledPopup = ({ marker, refetch }) => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    let newMarker = {
      ...marker,
    };
    newMarker.name = data.name;
    newMarker.url = data.url;
    await handleUpdate(newMarker);
  };
  const handleDelete = async (id) => {
    await deleteMarker(id);
    await refetch();
  };
  const handleUpdate = async (data) => {
    await updateMarker(data);
    await refetch();
    setIsEditing(false);
  };
  const [isEditing, setIsEditing] = useState(false);
  const EditingPane = () => (
    <div style={{ display: "flex", flexDirection: "column", margin: 1 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p style={{ margin: 0 }}>Image url</p>
            <textarea defaultValue={marker.url} {...register("url")} />
          </div>
          <div>
            <p style={{ margin: 0 }}>Marker Name</p>
            <textarea defaultValue={marker.name} {...register("name")} type="textarea" style={{ width: "100%", marginTop: 3 }}></textarea>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
            <div>
              <button type="submit">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const NormalPane = () => (
    <div style={{ display: "flex", flexDirection: "column", margin: 1, justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <img src={marker.url} alt="new" />
        </div>
        <div style={{ marginLeft: 10 }}>{!isEditing ? marker.name : "editing"}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div>
          <button onClick={() => handleDelete(marker.id)}>Delete Marker</button>
        </div>
        <div>
          <button onClick={() => setIsEditing(true)}>Edit Marker</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Popup>
        <div
          style={{
            height: isEditing ? "15vh" : "10vh",
          }}
        >
          {isEditing ? <EditingPane /> : <NormalPane />}
        </div>
      </Popup>
    </>
  );
};
