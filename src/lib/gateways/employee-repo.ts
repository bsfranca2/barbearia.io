import type { Employee } from "~/types/barbershop";
import { db } from "../db";

export type GetBarbersActive = (barbershopSlug: string) => Promise<Employee[]>;

export const getBarbersActiveDB: GetBarbersActive = async (barbershopSlug) => {
  // TODO: implement where is active and is barber
  return await db
    .selectFrom("Employee")
    .selectAll("Employee")
    .innerJoin("Barbershop", "Barbershop.id", "Employee.barbershopId")
    .where("Barbershop.slug", "=", barbershopSlug)
    .execute();
};
