import type { Generated } from "kysely";

export interface Barbershop {
  id: Generated<number>;
  name: string;
  addressId: number;
  phone: string;
  email: string | null;
  description: string | null;
  logo: string | null;
}
