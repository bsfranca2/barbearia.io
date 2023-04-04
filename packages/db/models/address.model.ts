import type { Generated } from "kysely";

export interface Address {
  id: Generated<number>;
  cep: string;
  cityId: number;
  neighborhood: string;
  street: string;
  number: string;
  complement: string | null;
  // location: unknown | null;
}
