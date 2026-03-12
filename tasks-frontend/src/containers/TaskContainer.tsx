import { useEffect, useState, useMemo } from 'react';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import TaskView from '../views/taskView';
import { EditTaskModal } from '../components/common/taskEditModal';
import type { Task } from '../types/task.types';
import type { Project } from '../types/project.types';

export const TaskContainer = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.id - b.id);
  }, [tasks]);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.id - b.id);
  }, [projects]);


  const fetchTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);
      try {
        const [tasksData, projectsData] = await Promise.all([
          taskService.getAll(controller.signal),
          projectService.getAll(controller.signal)
        ]);

        setTasks(tasksData.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
        setProjects(projectsData);
      } catch (err: any) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') {
          console.log('Petición cancelada con éxito');
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => controller.abort(); 
  }, []);

  const handleUpdate = async (id: number, data: Partial<Task>) => {
    await taskService.update(id, data);
    fetchTasks(); // Refrescamos la lista
    setEditingTask(null); // Cerramos el modal
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Borrar?')) {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleCreate = async (title: string) => {
    try {
      await taskService.create({ title, description: '', completed: false });
      // Refrescamos la lista llamando de nuevo a la API o actualizando el estado
      fetchTasks(); 
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };

  return (
    <>
      <TaskView 
        tasks={sortedTasks} 
        loading={loading} 
        onDelete={handleDelete}
        onEditClick={(task) => setEditingTask(task)}
        onCreate={handleCreate}
      />

      {editingTask && (
        <EditTaskModal 
          task={editingTask} 
          projects={sortedProjects}
          onClose={() => setEditingTask(null)} 
          onSave={handleUpdate} 
        />
      )}
    </>
  );
};