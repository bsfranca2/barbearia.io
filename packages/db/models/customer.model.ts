import type { Generated } from "kysely";

export interface Customer {
  id: Generated<number>;
  barbershopId: number;
  name: string;
  email: string | null;
  phone: string | null;
  picture: string | null;
}
