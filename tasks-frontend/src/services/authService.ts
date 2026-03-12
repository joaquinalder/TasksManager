import api from '../api/axios';
import type { UserLogin } from '../types/auth.types';


export const login = async (UserLogin: UserLogin) => {
  const { data } = await api.post(`auth/login`, {
    email: UserLogin.email,
    password: UserLogin.password,
  } );
  
  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
};