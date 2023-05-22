import type { Generated } from "kysely";
import type { Address, City, State } from "~/types/address";
import type { Appointment } from "~/types/appointment";
import type {
  Barbershop,
  Employee,
  EmployeeService,
  Service,
  WorkingHours,
} from "~/types/barbershop";
import type { Customer } from "~/types/customer";
import type { BarbershopUser, User } from "~/types/user";

export interface Account {
  id: Generated<number>;
  userId: number;
  userType: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken: string | null;
  accessToken: string | null;
  expiresAt: Date | null;
  tokenType: string | null;
  scope: string | null;
  idToken: string | null;
  sessionState: string | null;
}

export interface Category {
  id: Generated<number>;
  name: string;
  barbershopId: number;
}

export interface Role {
  id: Generated<number>;
  name: string;
}

type EmployeeDB = Omit<Employee, "id" | "roles"> & {
  id: Generated<number>;
  roles: string | null;
};

export interface Database {
  State: State & { id: Generated<number> };
  City: City;
  Address: Address & { id: Generated<number> };
  Barbershop: Barbershop & { id: Generated<number> };
  Role: Role;
  Employee: EmployeeDB;
  WorkingHours: WorkingHours & { id: Generated<number> };
  Category: Category;
  Service: Service & { id: Generated<number> };
  EmployeeService: EmployeeService & { id: Generated<number> };
  Customer: Customer & { id: Generated<number> };
  Appointment: Appointment & { id: Generated<number> };
  User: User & { id: Generated<number> };
  BarbershopUser: BarbershopUser & { id: Generated<number> };
}
