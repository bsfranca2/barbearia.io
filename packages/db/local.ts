import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";

import type { Database as DatabaseModels } from "./models";

const db = new Kysely<DatabaseModels>({
  dialect: new MysqlDialect({
    pool: createPool({
      host: "localhost",
      port: 33807,
      user: "root",
      database: "unsharded",
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
    }),
  }),
});

export const getConnection = (): Database => {
  return db;
};

export type Database = typeof db;
