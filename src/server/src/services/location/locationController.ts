import { LocationDTOType, LocationType } from "../../types";
import { getLocationInfoFromLatitudeAndLongitude } from "./api";
import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { Location } from "src/models/location.model";
const repo = require("./locationRepository");

const locationValidationSchema = yup.object().shape({
  latitude: yup.number().min(-90, "Invalid latitude. Min value -90").max(90, "Invalid latitude. Max value 90").required("Latitude is required."),
  longitude: yup
    .number()
    .min(-360, "Invalid longitude. Min value -360")
    .max(360, "Invalid latitude. Max value 360")
    .required("Longitude is required."),
});
export const addLocation = async (req: Request<{}, {}, {}, LocationDTOType>, resp: Response, next: NextFunction) => {
  try {
    const latAndlong: LocationDTOType = {
      latitude: req.query.latitude,
      longitude: req.query.longitude,
    };
    await locationValidationSchema.validate(latAndlong, {
      abortEarly: false,
    });
    const location = await saveLocation(req.query.latitude, req.query.longitude);
    return resp.json(location);
  } catch (error) {
    next(error);
  }
  return;
};

export const getLocations = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const locations = await repo.getAllLocations();
    return resp.json(locations);
  } catch (error) {
    next(error);
  }
  return;
};

export const updateLocation = async (req: Request, resp: Response, next: NextFunction) => {
  const { latitude, longitude, name, url, id } = req.body;
  try {
    const latAndlong: LocationDTOType = {
      latitude: latitude,
      longitude: longitude,
    };
    await locationValidationSchema.validate(latAndlong);
    const location: LocationType = {
      id,
      latitude,
      longitude,
      name,
      url,
    };
    const response = await repo.updateLocation(location);
    return resp.json(response);
  } catch (error) {
    next(error);
  }
  return;
};
export const deleteLocation = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    await repo.deleteLocation(id);
    resp.status(204);
    return resp.json();
  } catch (error) {
    next(error);
  }
  return;
};

const saveLocation = async (latitude: number, longitude: number): Promise<Location> => {
  const resp = await getLocationInfoFromLatitudeAndLongitude(latitude, longitude);

  if (resp.data.address === undefined) {
    throw new Error("Unable to geocode");
  }
  const locationName: string = resp.data.display_name;
  const countryCode: string = resp.data.address.country_code;
  const location: LocationType = {
    name: locationName,
    latitude: latitude,
    longitude: longitude,
    url: `https://flagcdn.com/80x60/${countryCode}.png`,
  };
  return await repo.addLocation(location);
};
