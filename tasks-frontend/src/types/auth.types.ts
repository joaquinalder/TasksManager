export interface UserLogin {
  email: string;
  password: string;
}

export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}