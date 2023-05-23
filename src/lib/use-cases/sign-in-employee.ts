import type { UseCase } from "~/types/use-case";
import type { Employee } from "~/types/barbershop";
import {
  getEmployeeByEmailOrPhoneNumberDB,
  type GetEmployeeByEmailOrPhoneNumber,
} from "~/lib/gateways/employee-repo";

type SignInEmployeeUseCase = UseCase<
  {
    emailOrPhoneNumber: string;
    password: string;
  },
  {
    getEmployeeByEmailOrPhoneNumber: GetEmployeeByEmailOrPhoneNumber;
  },
  Employee
>;

export const signInEmployeeUseCase: SignInEmployeeUseCase = async (
  { emailOrPhoneNumber, password },
  { getEmployeeByEmailOrPhoneNumber } = {
    getEmployeeByEmailOrPhoneNumber: getEmployeeByEmailOrPhoneNumberDB,
  }
) => {
  const employee = await getEmployeeByEmailOrPhoneNumber(emailOrPhoneNumber);

  if (!employee) {
    throw new Error("Employee not found");
  }

  // TODO: Check password

  return employee;
};
