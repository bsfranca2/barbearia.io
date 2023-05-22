import type { UseCase } from "~/types/use-case";
import type { Barbershop } from "~/types/barbershop";
import {
  type GetBarbershopBySlug,
  getBarbershopBySlugDB,
} from "~/lib/gateways/barbershop-repo";

type GetBarbershopBySlugUseCase = UseCase<
  {
    slug: string;
  },
  {
    getBarbershopBySlug: GetBarbershopBySlug;
  },
  Barbershop
>;

export const getBarbershopBySlugUseCase: GetBarbershopBySlugUseCase = async (
  { slug },
  { getBarbershopBySlug } = { getBarbershopBySlug: getBarbershopBySlugDB }
) => {
  return await getBarbershopBySlug(slug);
};
