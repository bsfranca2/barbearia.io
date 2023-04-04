import type { Generated } from "kysely";

export interface Employee {
  id: Generated<number>;
  name: string;
  email: string;
  phone: string;
  picture: string | null;
  roleId: number;
  barbershopId: number;
}
