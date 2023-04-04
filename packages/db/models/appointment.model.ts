import type { Generated } from "kysely";

export interface Appointment {
  id: Generated<number>;
  customerId: number;
  employeeServiceId: number;
  duration: unknown;
}
