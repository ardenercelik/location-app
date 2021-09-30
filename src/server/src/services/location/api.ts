//https://nominatim.openstreetmap.org/reverse?lat=11.523088&lon=20.646101&format=json
import axios, { AxiosResponse } from "axios";

interface Address {
  hamlet: string;
  state: string;
  country: string;
  country_code: string;
}

export interface StreetAPIResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}
const locationApi = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLocationInfoFromLatitudeAndLongitude = (latitude: number, longitude: number): Promise<AxiosResponse<StreetAPIResponse>> => {
  return locationApi.get<StreetAPIResponse>(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
};
