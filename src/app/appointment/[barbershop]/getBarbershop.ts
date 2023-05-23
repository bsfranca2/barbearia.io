import { cache } from "react";
import { getBarbershopBySlugUseCase } from "~/lib/use-cases/get-barbershop-by-slug";

export const getBarbershopBySlug = cache(getBarbershopBySlugUseCase);
