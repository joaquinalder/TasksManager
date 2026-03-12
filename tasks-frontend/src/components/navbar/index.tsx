import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navegación programática
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Marca */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
            <span className="text-white font-black text-xl leading-none">T</span>
          </div>
          <span className="text-xl font-bold from-white to-slate-400 bg-clip-text text-transparent">
            TaskMaster <span className="text-blue-500">Pro</span>
          </span>
        </Link>

        {/* Links de Navegación (Solo si hay usuario) */}
        {user && (
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-blue-400">Dashboard</Link>
            <Link to="/projects" className="text-sm font-medium text-slate-400">Proyectos</Link>
          </div>
        )}

        {/* Sección de Perfil / Login */}
        <div className="flex items-center gap-4">
          {user ? (
            // ESCENARIO: USUARIO LOGUEADO
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end sm:flex">
                <span className="text-sm font-semibold text-white">
                  {user.name || user.email.split('@')[0]}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Online</span>
              </div>
              
              {/* Avatar con Dropdown al Hover */}
              <div className="relative group">
                <div className="w-10 h-10 rounded-full from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center overflow-hidden hover:border-blue-500 transition-all cursor-pointer">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Menú desplegable al pasar el mouse */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-2 min-w-150px">
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="...">Iniciar Sesión</Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;