import type { Generated } from "kysely";
import type { Address, City, State } from "~/types/address";
import type { Appointment } from "~/types/appointment";
import type {
  Barbershop,
  BarbershopConfig,
  BarbershopEmployee,
  Employee,
  EmployeeAccount,
  EmployeeService,
  Service,
  WorkingHours,
} from "~/types/barbershop";
import type { Customer, CustomerAccount } from "~/types/customer";

export interface Category {
  id: Generated<number>;
  name: string;
  barbershopId: number;
}

export type BarbershopEmployeeTable = Omit<
  BarbershopEmployee,
  "id" | "roles"
> & {
  id: Generated<number>;
  roles: string | null;
};

export interface Database {
  State: State & { id: Generated<number> };
  City: City;
  Address: Address & { id: Generated<number> };
  Barbershop: Barbershop & { id: Generated<number> };
  BarbershopConfig: BarbershopConfig & { id: Generated<number> };
  Employee: Employee & { id: Generated<number>, createdAt: Generated<Date> };
  WorkingHours: WorkingHours & { id: Generated<number> };
  Category: Category;
  Service: Service & { id: Generated<number> };
  EmployeeService: EmployeeService & { id: Generated<number> };
  Customer: Customer & { id: Generated<number> };
  Appointment: Appointment & { id: Generated<number> };
  CustomerAccount: CustomerAccount & { id: Generated<number> };
  EmployeeAccount: EmployeeAccount & { id: Generated<number> };
  BarbershopEmployee: BarbershopEmployeeTable;
}
