export interface Customer {
  id: number;
  barbershopId: number;
  name: string;
  email: string | null;
  phone: string | null;
  picture: string | null;
}
