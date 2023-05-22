import type { Generated } from "kysely";

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

export interface Address {
  id: Generated<number>;
  cep: string;
  cityId: number;
  neighborhood: string;
  street: string;
  number: string;
  complement: string | null;
  // location: unknown | null;
}

export interface Appointment {
  id: Generated<number>;
  customerId: number;
  employeeServiceId: number;
  duration: number;
  date: Date;
}

export interface Barbershop {
  id: Generated<number>;
  name: string;
  slug: string;
  addressId: number | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  logo: string | null;
}

export interface Category {
  id: Generated<number>;
  name: string;
  barbershopId: number;
}

export interface City {
  id: Generated<number>;
  name: string;
  stateId: number;
}

export interface Customer {
  id: Generated<number>;
  barbershopId: number;
  name: string;
  email: string | null;
  phone: string | null;
  picture: string | null;
}

export interface EmployeeService {
  id: Generated<number>;
  employeeId: number;
  serviceId: number;
  duration: number | null;
  price: number | null;
}

export interface Employee {
  id: Generated<number>;
  name: string;
  email: string;
  phone: string;
  picture: string | null;
  roleId: number;
  barbershopId: number;
}

export interface Role {
  id: Generated<number>;
  name: string;
}

export interface Service {
  id: Generated<number>;
  barbershopId: number;
  categoryId: number | null;
  name: string;
  description: string | null;
  price: string;
  duration: number;
  picture: string | null;
}

export interface State {
  id: Generated<number>;
  name: string;
}

export interface User {
  id: Generated<number>;
  entityId: number;
  name: string;
  email: string;
  emailVerifiedAt: Date | null;
  phone: string;
  phoneVerifiedAt: Date | null;
  password: string | null;
}

export interface BarbershopUser {
  id: Generated<number>;
  barbershopId: number;
  userId: number;
  entityType: "EMPLOYEE" | "CUSTOMER";
}

export interface WorkingHours {
  id: Generated<number>;
  employeeId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Database {
  State: State;
  City: City;
  Address: Address;
  Barbershop: Barbershop;
  Role: Role;
  Employee: Employee;
  WorkingHours: WorkingHours;
  Category: Category;
  Service: Service;
  EmployeeService: EmployeeService;
  Customer: Customer;
  Appointment: Appointment;
  User: User;
  BarbershopUser: BarbershopUser;
}
