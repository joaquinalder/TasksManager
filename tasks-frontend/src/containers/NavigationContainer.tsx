import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskContainer } from './TaskContainer';
import { ProjectContainer } from './ProjectContainer';
import { LoginForm } from '../components/login';
import { useAuth } from '../context/AuthContext';


export const NavigationContainer = () => {
 const { user, loading } = useAuth();

  if (loading) return <div className="text-white">Cargando sesión...</div>;

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" />} />

      <Route 
        path="/" 
        element={user ? <TaskContainer /> : <Navigate to="/login" />} 
      />
      <Route path="/tasks" element={user ? <TaskContainer /> : <Navigate to="/login" />} />

      <Route 
        path="/projects" 
        element={user ? <ProjectContainer /> : <Navigate to="/login" />} 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default NavigationContainer;
