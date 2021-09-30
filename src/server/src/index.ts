import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { locationRouter } from "./routers/locationRouter";
import Knex from "knex";
import { Model } from "objection";
import knexConfig from "./knexfile";
const middlewares = require("./middlewares");
require("dotenv").config();

const knex = Knex(knexConfig.development);
Model.knex(knex);

const main = async () => {
  await knex.migrate.latest();
  const app = express();
  const port = process.env.PORT || 5050;

  app.use(morgan("common"));
  app.use(helmet());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  app.use("/api", locationRouter);
  app.use(middlewares.notFoundHandler);
  app.use(middlewares.errorHandler);

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};
main().catch((err) => {
  console.error(err);
});
