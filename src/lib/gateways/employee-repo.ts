import type {
  Employee,
  EmployeeAccount,
  WorkingHours,
} from "~/types/barbershop";
import { db } from "~/lib/db";

export type GetBarbersActive = (barbershopSlug: string) => Promise<Employee[]>;

export const getBarbersActiveDB: GetBarbersActive = async (barbershopSlug) => {
  // TODO: change for where be in id
  return await db
    .selectFrom("BarbershopEmployee")
    .innerJoin("Employee", "Employee.id", "BarbershopEmployee.employeeId")
    .innerJoin("Barbershop", "Barbershop.id", "BarbershopEmployee.barbershopId")
    .selectAll("Employee")
    .where("Barbershop.slug", "=", barbershopSlug)
    .where("BarbershopEmployee.roles", "like", "%BARBER%")
    .where("BarbershopEmployee.archivedAt", "is", null)
    .where("BarbershopEmployee.deletedAt", "is", null)
    .execute();
};

export type GetEmployeeById = (id: number) => Promise<Employee | null>;

export const getEmployeeByIdDB: GetEmployeeById = async (id) => {
  const employee = await db
    .selectFrom("Employee")
    .selectAll("Employee")
    .where("Employee.id", "=", id)
    .executeTakeFirst();
  return employee ?? null;
};

export type GetWorkingHoursByEmployee = (
  employeeId: number
) => Promise<WorkingHours[]>;

export const getWorkingHoursByEmployeeDB: GetWorkingHoursByEmployee = async (
  employeeId
) => {
  return await db
    .selectFrom("WorkingHours")
    .selectAll("WorkingHours")
    .where("WorkingHours.employeeId", "=", employeeId)
    .execute();
};

export type GetEmployeeByEmailOrPhoneNumber = (
  emailOrPhoneNumber: string
) => Promise<(Employee & Pick<EmployeeAccount, "password">) | null>;

export const getEmployeeByEmailOrPhoneNumberDB: GetEmployeeByEmailOrPhoneNumber =
  async (emailOrPhoneNumber) => {
    const employee = await db
      .selectFrom("Employee")
      .selectAll("Employee")
      .innerJoin("EmployeeAccount", "EmployeeAccount.employeeId", "Employee.id")
      .select("EmployeeAccount.password")
      .where(({ or, cmpr }) =>
        or([
          cmpr("Employee.email", "=", emailOrPhoneNumber),
          cmpr("Employee.phoneNumber", "=", emailOrPhoneNumber),
        ])
      )
      .executeTakeFirst();
    return employee ?? null;
  };

export type GetEmployeeServices = (employeeId: number) => Promise<
  {
    employeeServiceId: number;
    serviceId: number;
    name: string;
    description: string | null;
    price: string;
    duration: number;
    customPrice: string | null;
    customDuration: number | null;
  }[]
>;

export const getEmployeeServicesDB: GetEmployeeServices = async (
  employeeId
) => {
  return await db
    .selectFrom("EmployeeService")
    .innerJoin("Service", "Service.id", "EmployeeService.serviceId")
    .innerJoin("Employee", "Employee.id", "EmployeeService.employeeId")
    .where("EmployeeService.employeeId", "=", employeeId)
    .select([
      "EmployeeService.id as employeeServiceId",
      "Service.id as serviceId",
      "Service.name",
      "Service.description",
      "Service.duration",
      "Service.price",
      "EmployeeService.price as customPrice",
      "EmployeeService.duration as customDuration",
    ])
    .execute();
};
