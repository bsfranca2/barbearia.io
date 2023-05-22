import { db } from "~/lib/db";

export const getServices = async (employeeId: string) => {
  return await db
    .selectFrom("EmployeeService")
    .innerJoin("Service", "Service.id", "EmployeeService.serviceId")
    .innerJoin("Employee", "Employee.id", "EmployeeService.employeeId")
    .where("EmployeeService.employeeId", "=", Number(employeeId))
    .select(["EmployeeService.id", "Service.name"])
    .where("Employee.archivedAt", "is", null)
    .where("Employee.deletedAt", "is", null)
    .execute();
};
