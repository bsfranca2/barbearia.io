export interface Barbershop {
  id: number;
  name: string;
  slug: string;
  addressId: number | null;
  phoneNumber: string | null;
  email: string | null;
  description: string | null;
  logo: string | null;
}

export interface BarbershopConfig {
  id: number;
  barbershopId: number;
  minimumBookingNotice: number;
  minimumTimeBetweenAppointments: number;
  beforeAppointmentBuffer: number;
  afterAppointmentBuffer: number;
  slotInterval: number;
  maximumAdvanceBookDays: number;
}

export enum Roles {
  Admin = "ADMIN",
  Barber = "BARBER",
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: Date | null;
  phoneNumber: string;
  phoneNumberVerifiedAt: Date | null;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface EmployeeAccount {
  id: number;
  employeeId: number;
  password: string | null;
}

export interface BarbershopEmployee {
  id: number;
  barbershopId: number;
  employeeId: number;
  roles: Roles[];
  archivedAt: Date | null;
  deletedAt: Date | null;
}

export interface WorkingHours {
  id: number;
  employeeId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Service {
  id: number;
  barbershopId: number;
  categoryId: number | null;
  name: string;
  description: string | null;
  price: string;
  duration: number;
  picture: string | null;
}

export interface EmployeeService {
  id: number;
  employeeId: number;
  serviceId: number;
  price: string | null;
  duration: number | null;
}
