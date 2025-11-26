export interface IUserAuth {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface IProduct {
  id: string;
  image: string;
  name: string;
  createdAt: string;
  price: number;
  isActive: boolean;
}
