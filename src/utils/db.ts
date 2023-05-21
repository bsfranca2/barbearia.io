import { db } from "~/lib/db";

export const getConnection = () => db;

export const getBarbershopSlugList = async () => {
  return await getConnection()
    .selectFrom("Barbershop")
    .select("Barbershop.slug")
    .execute();
};

export const getBarbershopBySlug = async (slug: string) => {
  return await getConnection()
    .selectFrom("Barbershop")
    .selectAll()
    .where("Barbershop.slug", "=", slug)
    .executeTakeFirst();
};
