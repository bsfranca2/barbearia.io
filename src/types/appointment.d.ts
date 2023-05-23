export interface Appointment {
  id: number;
  customerId: number;
  employeeServiceId: number;
  duration: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date | null;
}
