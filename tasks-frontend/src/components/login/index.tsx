import { useState } from 'react';
import { login } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';



export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const data = await login({email, password});
        setUser(data.user);
        alert('¡Bienvenido!');
    } catch (error) {
        alert('Credenciales inválidas');
    }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-slate-800 rounded-xl">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 rounded bg-slate-900 text-white" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 rounded bg-slate-900 text-white" />
      <button type="submit" className="bg-blue-600 p-2 rounded font-bold">Entrar</button>
    </form>
  );
};