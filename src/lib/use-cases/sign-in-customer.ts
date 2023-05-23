import type { UseCase } from "~/types/use-case";
import type { Customer } from "~/types/customer";
import {
  getCustomerByEmailOrPhoneNumberDB,
  type GetCustomerByEmailOrPhoneNumber,
} from "~/lib/gateways/customer-repo";

type SignInCustomerUseCase = UseCase<
  {
    emailOrPhoneNumber: string;
    password: string;
  },
  {
    getCustomerByEmailOrPhoneNumber: GetCustomerByEmailOrPhoneNumber;
  },
  Customer
>;

export const signInCustomerUseCase: SignInCustomerUseCase = async (
  { emailOrPhoneNumber, password },
  { getCustomerByEmailOrPhoneNumber } = {
    getCustomerByEmailOrPhoneNumber: getCustomerByEmailOrPhoneNumberDB,
  }
) => {
  const customer = await getCustomerByEmailOrPhoneNumber(emailOrPhoneNumber);

  if (!customer) {
    throw new Error("Customer not found");
  }

  // TODO: Check password

  return customer;
};
