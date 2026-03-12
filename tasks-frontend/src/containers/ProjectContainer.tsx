import { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';
import type { Project } from '../types/project.types';
import { createPortal } from 'react-dom';

export const ProjectContainer = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectService.create(formData);
      fetchProjects();
      closeModal();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  // const handleUpdate = async (id: number, data: Partial<Project>) => {
  //   try {
  //     await projectService.update(id, data);
  //     fetchProjects();
  //     setEditingProject(null);
  //   } catch (err) {
  //     console.error("Error updating project:", err);
  //   }
  // };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        await projectService.delete(id);
        setProjects(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    }
  };

  // const openCreateModal = () => {
  //   setFormData({ name: '', description: '' });
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    // setEditingProject(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Mis Proyectos</h2>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-blue-900/40 transition-all"
        >
          Crear Proyecto
        </button>
      </div>

      {loading ? (
        <div className="text-slate-500">Cargando proyectos...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map(project => (
            <div key={project.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-1">{project.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{project.description}</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => handleDelete(project.id)} className="text-red-500/70 hover:text-red-400 text-sm font-medium">Borrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Nuevo Proyecto</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Descripción</label>
                <textarea
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold"
                >
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectContainer;
