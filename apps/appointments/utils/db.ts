import { getConnection } from "@barbearia.io/db";

export const getBarbershopBySlug = async (slug: string) => {
  const connection = getConnection();
  const barbershop = await connection
    .selectFrom("Barbershop")
    .selectAll()
    .where("Barbershop.slug", "=", slug)
    .executeTakeFirst();
  return barbershop;
};
