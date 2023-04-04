import type { Generated } from "kysely";

export interface User {
  id: Generated<number>;
  barbershopId: number;
  entityId: number;
  entityType: 'EMPLOYEE' | 'CUSTOMER';
  name: string;
  email: string;
  emailVerifiedAt: Date | null;
  phone: string;
  phoneVerifiedAt: Date | null;
  password: string | null;
}
