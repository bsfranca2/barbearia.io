import type { Generated } from "kysely";

export interface City {
  id: Generated<number>;
  name: string;
  stateId: number;
}
