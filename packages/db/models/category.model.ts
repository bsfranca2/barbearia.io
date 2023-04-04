import type { Generated } from "kysely";

export interface Category {
  id: Generated<number>;
  name: string;
  barbershopId: number;
}
