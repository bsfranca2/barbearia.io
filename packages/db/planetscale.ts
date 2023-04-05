import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import type { Database as DatabaseModels } from "./models";

type Database = Kysely<DatabaseModels>;

const createInstance = () =>
  new Kysely<DatabaseModels>({
    dialect: new PlanetScaleDialect({
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      fetch,
    }),
    // log: ["query", "error"],
  });

let db: Database;

const globalForDB = globalThis as unknown as {
  db: Database;
};

if (process.env.NODE_ENV === "production") {
  db = createInstance();
} else {
  if (!globalForDB.db) {
    globalForDB.db = createInstance();
  }
  db = globalForDB.db;
}

export const getConnection = () => {
  return db;
};

export { sql } from "kysely";
