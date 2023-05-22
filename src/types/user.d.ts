export interface User {
  id: number;
  entityId: number;
  name: string;
  email: string;
  emailVerifiedAt: Date | null;
  phone: string;
  phoneVerifiedAt: Date | null;
  password: string | null;
}

export interface BarbershopUser {
  id: number;
  barbershopId: number;
  userId: number;
  entityType: "EMPLOYEE" | "CUSTOMER";
}
