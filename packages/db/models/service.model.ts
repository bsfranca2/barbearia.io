import type { Generated } from "kysely";

export interface Service {
  id: Generated<number>;
  barbershopId: number;
  categoryId: number | null;
  name: string;
  description: string | null;
  price: number;
  duration: unknown;
  picture: string | null;
}
