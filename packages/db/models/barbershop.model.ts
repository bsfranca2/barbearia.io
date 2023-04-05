import type { Generated } from "kysely";

export interface Barbershop {
  id: Generated<number>;
  name: string;
  slug: string;
  addressId: number | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  logo: string | null;
}
