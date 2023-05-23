import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

import { env } from "~/env.mjs";
import type { Database as DatabaseModels } from "./models";

export type Database = Kysely<DatabaseModels>;

const createInstance = () =>
  new Kysely<DatabaseModels>({
    dialect: new PlanetScaleDialect({
      host: env.DATABASE_HOST,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      fetch,
    }),
    log: env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

const globalForDB = globalThis as unknown as {
  db: Database;
};

export const db = globalForDB.db ?? createInstance();

if (env.NODE_ENV !== "production") globalForDB.db = db;

export type { Selectable } from "kysely";
