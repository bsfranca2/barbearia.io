import type { UseCase } from "~/types/use-case";
import type { Employee } from "~/types/barbershop";
import {
  type GetBarbersActive,
  getBarbersActiveDB,
} from "~/lib/gateways/employee-repo";

type GetBarbersUseCase = UseCase<
  {
    barbershopSlug: string;
  },
  {
    getBarbersActive: GetBarbersActive;
  },
  Employee[]
>;

export const getBarbersUseCase: GetBarbersUseCase = async (
  { barbershopSlug },
  { getBarbersActive } = { getBarbersActive: getBarbersActiveDB }
) => {
  /// TODO: Show barber availability
  return await getBarbersActive(barbershopSlug);
};
