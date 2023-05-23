import type { Barbershop, BarbershopConfig } from "~/types/barbershop";
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

export type GetBarbershopConfigByBarbershopId = (
  barbershopId: number
) => Promise<BarbershopConfig>;

export const getBarbershopConfigByBarbershopIdDB: GetBarbershopConfigByBarbershopId =
  async (barbershopId: number) => {
    return await db
      .selectFrom("BarbershopConfig")
      .selectAll("BarbershopConfig")
      .where("BarbershopConfig.barbershopId", "=", barbershopId)
      .executeTakeFirstOrThrow();
  };

// Not used in use case
export const getBarbershopSlugList = async () => {
  return await db.selectFrom("Barbershop").select("Barbershop.slug").execute();
};
