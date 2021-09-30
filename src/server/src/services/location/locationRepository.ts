import { Location } from "../../models/location.model";

export const addLocation = async (location: Location): Promise<Location> => await Location.query().insert(location);
export const getAllLocations = async (): Promise<Location[]> => await Location.query();
export const updateLocation = async (location: Location) => {
  const l = await Location.query().findById(location.id);
  if (l == undefined) {
    throw new Error("Items does not exist");
  }
  return await Location.query().patchAndFetchById(location.id, location);
};
export const deleteLocation = async (id: number) => {
  const l = await Location.query().findById(id);
  if (l == undefined) {
    throw new Error("Item does not exist");
  }
  await Location.query().deleteById(id);
};
