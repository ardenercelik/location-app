import axios from "axios";
import { BASE_URL } from "../constants";
const locationAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: BASE_URL,
  timeout: 2000,
});

export const getMarkers = async () => {
  return await locationAPI({
    method: "get",
    url: "/",
  });
};
export const updateMarker = async (data) => {
  try {
    return await locationAPI({
      method: "put",
      url: "/",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const postMarker = async (latitude, longitude) => {
  try {
    await locationAPI({
      method: "post",
      url: "",
      params: {
        latitude,
        longitude,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteMarker = async (id) => {
  try {
    await locationAPI.delete(`/${id}`);
  } catch (err) {
    console.log(err);
  }
};
