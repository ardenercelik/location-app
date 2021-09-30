import { Router } from "express";

import { addLocation, getLocations, updateLocation, deleteLocation } from "../services/location";
export const locationRouter = Router();

locationRouter.get("/", getLocations);
locationRouter.post("/", addLocation);
locationRouter.put("/", updateLocation);
locationRouter.delete("/:id", deleteLocation);
