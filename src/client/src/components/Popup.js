import { useState, useEffect } from "react";
import { Popup } from "react-leaflet";
import { deleteMarker, updateMarker } from "../api/locationApi";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import axios from "axios";
import { BASE_URL } from "../constants";
export const StyledPopup = ({ marker, refetch }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({});
  const [file, setFile] = useState("");
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
  const onUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        baseURL: BASE_URL,
      });

      const { fileName, filePath } = res.data;
      await setUploadedFile({ fileName: fileName, filePath: filePath });
      const newMarker = {
        ...marker,
      };
      newMarker.url = `${BASE_URL}/upload/${fileName}`;
      console.log({ newMarker });
      await updateMarker(newMarker);
      await refetch();
      setIsEditingImage(false);
      console.log("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  const EditingPane = () => (
    <div style={{ display: "flex", flexDirection: "column", margin: 1 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ margin: 0 }}>Image url</p>
              <textarea defaultValue={marker.url} {...register("url")} />
            </div>
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
          <img style={{ width: 120, height: 120 }} src={marker.url} alt="new" />
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
        <div>
          <button onClick={() => setIsEditingImage(true)}>Change Image</button>
        </div>
      </div>
    </div>
  );
  if (isEditingImage) {
    return (
      <>
        <Popup>
          <div
            style={{
              height: isEditing ? "15vh" : "10vh",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FileUpload onSubmit={onUpload} file={file} setFile={setFile} />
              <div>
                <button onClick={() => setIsEditingImage(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </Popup>
      </>
    );
  }
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
