import { db } from "~/lib/db";

export const getServices = async (employeeId: string) => {
  return await db
    .selectFrom("EmployeeService")
    .innerJoin("Service", "Service.id", "EmployeeService.serviceId")
    .where("EmployeeService.employeeId", "=", Number(employeeId))
    .select("EmployeeService.id")
    .select("Service.name")
    .execute();
};
