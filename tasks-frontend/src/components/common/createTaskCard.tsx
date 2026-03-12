import { useState } from 'react';

interface CreateTaskCardProps {
  onCreate: (title: string) => Promise<void>;
}

export const CreateTaskCard = ({ onCreate }: CreateTaskCardProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await onCreate(title);
    setTitle(''); // Limpiamos el input después de crear
  };

  return (
    <div className='bg-slate-800/50 border border-dashed border-slate-600 p-5 rounded-2xl hover:border-blue-500/50 transition-colors'>
      <h3 className="text-white font-bold text-lg mb-4 text-center">Nueva Tarea</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="¿Qué hay que hacer?"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button 
          type="submit"
          className="w-full bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white py-2 rounded-lg text-xs font-bold transition-all"
        >
          AÑADIR A LA LISTA
        </button>
      </form>
    </div>
  );
};