import { Model } from "objection";

export class Location extends Model {
  id!: number;
  url!: string;
  latitude!: number;
  longitude!: number;
  name!: string;

  static tableName = "Location";
  static get jsonSchema() {
    return {
      type: "object",
      required: ["url", "latitude", "longitude", "url", "name"],

      properties: {
        id: { type: "integer" },
        url: { type: "string", minLength: 1, maxLength: 500 },
        name: { type: "string", minLength: 1, maxLength: 500 },
        latitude: { type: "real", minLength: 1, maxLength: 500 },
        longitude: { type: "real", minLength: 1, maxLength: 500 },
      },
    };
  }
}
