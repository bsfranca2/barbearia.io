import type { Generated } from "kysely";

export interface WorkingHours {
  id: Generated<number>;
  employeeId: number;
  dayOfWeek: number;
  startAt: string;
  endAt: string;
}
