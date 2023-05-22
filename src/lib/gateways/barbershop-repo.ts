import type { Barbershop } from "~/types/barbershop";
import { db } from "~/lib/db";

export type GetBarbershopBySlug = (slug: string) => Promise<Barbershop>;

export const getBarbershopBySlugDB: GetBarbershopBySlug = async (
  slug: string
) => {
  return await db
    .selectFrom("Barbershop")
    .selectAll("Barbershop")
    .where("Barbershop.slug", "=", slug)
    .executeTakeFirstOrThrow();
};

// Not used in use case
export const getBarbershopSlugList = async () => {
  return await db.selectFrom("Barbershop").select("Barbershop.slug").execute();
};
