import type { UseCase } from "~/types/use-case";
import {
  type GetEmployeeServices,
  getEmployeeServicesDB,
} from "~/lib/gateways/employee-repo";

type GetEmployeeServicesUseCase = UseCase<
  {
    employeeId: number;
  },
  {
    getEmployeeServices: GetEmployeeServices;
  },
  // TODO: Add type for this
  Awaited<ReturnType<typeof getEmployeeServicesDB>>
>;

export const getEmployeeServicesUseCase: GetEmployeeServicesUseCase = async (
  { employeeId },
  { getEmployeeServices } = { getEmployeeServices: getEmployeeServicesDB }
) => {
  return await getEmployeeServices(employeeId);
};
