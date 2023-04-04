import type { Generated } from "kysely";

export interface EmployeeService {
  id: Generated<number>;
  employeeId: number;
  serviceId: number;
  duration: unknown | null;
  price: number | null;
}
