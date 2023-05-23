export interface Customer {
  id: number;
  barbershopId: number;
  name: string;
  email: string | null;
  emailVerifiedAt: Date | null;
  phoneNumber: string | null;
  phoneNumberVerifiedAt: Date | null;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CustomerAccount {
  id: number;
  customerId: number;
  password: string | null;
}
