import { useState } from 'react';
import type { Task } from '../../types/task.types';
import type { Project } from '../../types/project.types';
import { createPortal } from 'react-dom';

interface EditTaskModalProps {
  task: Task;
  projects: Project[];
  onClose: () => void;
  onSave: (id: number, updatedTask: Partial<Task>) => Promise<void>;
}

export const EditTaskModal = ({ task, projects, onClose, onSave }: EditTaskModalProps) => {
  const defaultOption = <option key="none" value="">Sin Proyecto</option>;

  const projectsOptions =  [defaultOption, ...projects.map(project => (
    <option key={project.id} value={project.id}>{project.name}</option>
  ))];

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    completed: task.completed,
    projectId: task.project?.id
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(task.id, { 
      title: formData.title, 
      description: formData.description, 
      completed: formData.completed,
      projectId: formData.projectId
    });
  };

  const modalContent = (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      
      {/* El contenido del modal */}
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        <h2 className="text-xl font-bold text-white mb-6">Editar Tarea</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Descripción</label>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <input
              type="checkbox"
              id="completed"
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
              checked={formData.completed}
              onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
            />
            <label htmlFor="completed" className="text-sm font-medium text-slate-300 cursor-pointer">
              Marcar como completada
            </label>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <select 
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors w-full"
              // 1. Vinculamos el valor al estado (si es null, usamos string vacío)
              value={formData.projectId || ''} 
              // 2. Actualizamos el estado al cambiar
              onChange={(e) => {
                const val = e.target.value;
                setFormData({ 
                  ...formData, 
                  projectId: val === "" ? undefined : Number(val) 
                });
              }}
            >
              {projectsOptions}
            </select>
          </div>
          

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-blue-900/40 transition-all"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};