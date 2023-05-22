export interface State {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  stateId: number;
}

export interface Address {
  id: number;
  cep: string;
  cityId: number;
  neighborhood: string;
  street: string;
  number: string;
  complement: string | null;
  // location: unknown | null;
}
