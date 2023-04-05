import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import type { Database as DatabaseModels } from "./models";

const db = new Kysely<DatabaseModels>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    fetch
  }),
});

export const getConnection = (): Database => {
  return db;
};

export type Database = typeof db;
