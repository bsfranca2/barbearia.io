export interface Barbershop {
  id: number;
  name: string;
  slug: string;
  addressId: number | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  logo: string | null;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  picture: string | null;
  roleId: number;
  barbershopId: number;
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
  duration: number | null;
  price: number | null;
}
