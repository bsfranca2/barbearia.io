import { type Address } from "./address.model";
import { type Appointment } from "./appointment.model";
import { type Barbershop } from "./barbershop.model";
import { type Category } from "./category.model";
import { type City } from "./city.model";
import { type Customer } from "./customer.model";
import { type EmployeeService } from "./employee-service.model";
import { type Employee } from "./employee.model";
import { type Role } from "./role.model";
import { type Service } from "./service.model";
import { type State } from "./state.model";
import { type User } from "./user.model";
import { type WorkingHours } from "./working-hours.model";

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
}
