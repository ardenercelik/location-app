import Knex from "knex";
import { Model } from "objection";
import knexConfig from "../../knexfile";

const repo = require("./locationRepository");
const knex = Knex(knexConfig.test);
Model.knex(knex);

beforeAll(async () => {
  // run the migrations and do any other setup here
  await knex.migrate.latest();
  await knex.seed.run();
});
test("get all locations", async () => {
  const locations = await repo.getAllLocations();
  expect(locations.length).toEqual(3);
});
test("update when id exists", async () => {
  const locationToBe = { id: 1, latitude: 10.5, longitude: 10.5, name: "a", url: "aa" };
  const location = await repo.updateLocation(locationToBe);
  expect(location).toEqual(locationToBe);
});
test("update when id not exists", async () => {
  const locationToBe = { id: 10, latitude: 10.5, longitude: 10.5, name: "a", url: "aa" };
  expect(async () => {
    await repo.deleteLocation(locationToBe).toThrow();
  });
});
test("add a location", async () => {
  const locationToAdd = { latitude: 10.5, longitude: 10.5, name: "a", url: "aa" };
  await repo.addLocation(locationToAdd);
  const locations = await repo.getAllLocations();
  expect(locations.length).toEqual(4);
});
test("delete a location when exists", async () => {
  await repo.deleteLocation(1);
  const locations = await repo.getAllLocations();
  const l = { id: 1, url: "rowValue1", name: "name1", latitude: 10.5, longitude: 10 };
  expect(locations[0]).not.toEqual(l);
});
test("delete a location when not exists", async () => {
  expect(async () => {
    await repo.deleteLocation(11).toThrow();
  });
});

afterAll(async () => {
  await knex.destroy();
});
