import type { Generated } from "kysely";

export interface WorkingHours {
  id: Generated<number>;
  employeeId: number;
  dayOfWeek: unknown;
  startAt: unknown;
  endAt: unknown;
}
