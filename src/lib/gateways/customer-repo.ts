import type { Customer, CustomerAccount } from "~/types/customer";
import { db } from "~/lib/db";

export type GetCustomerByEmailOrPhoneNumber = (
  emailOrPhoneNumber: string
) => Promise<(Customer & Pick<CustomerAccount, "password">) | null>;

export const getCustomerByEmailOrPhoneNumberDB: GetCustomerByEmailOrPhoneNumber =
  async (emailOrPhoneNumber) => {
    const customer = await db
      .selectFrom("Customer")
      .selectAll("Customer")
      .innerJoin("CustomerAccount", "CustomerAccount.customerId", "Customer.id")
      .select("CustomerAccount.password")
      .where(({ or, cmpr }) =>
        or([
          cmpr("Customer.email", "=", emailOrPhoneNumber),
          cmpr("Customer.phoneNumber", "=", emailOrPhoneNumber),
        ])
      )
      .executeTakeFirst();
    return customer ?? null;
  };
