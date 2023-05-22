import type { Employee, Roles } from "~/types/barbershop";
import { db } from "../db";

export type GetBarbersActive = (barbershopSlug: string) => Promise<Employee[]>;

export const getBarbersActiveDB: GetBarbersActive = async (barbershopSlug) => {
  const records = await db
    .selectFrom("Employee")
    .selectAll("Employee")
    .innerJoin("Barbershop", "Barbershop.id", "Employee.barbershopId")
    .where("Barbershop.slug", "=", barbershopSlug)
    .where("Employee.roles", "like", "%BARBER%")
    .where("Employee.archivedAt", "is", null)
    .where("Employee.deletedAt", "is", null)
    .execute();
  return records.map((record) => ({
    ...record,
    roles: (record.roles?.split(",") as Roles[]) ?? [],
  }));
};
