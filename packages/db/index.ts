import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import type { Database as DatabaseModels } from "./models";

const db = new Kysely<DatabaseModels>({
  dialect: new PlanetScaleDialect({
    host: "<host>",
    username: "<user>",
    password: "<password>",
  }),
});

export const getConnection = (): Database => {
  return db;
};

export type Database = typeof db;
