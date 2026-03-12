import type { Task } from '../types/task.types';
import { CreateTaskCard } from '../components/common/createTaskCard';

interface TaskViewProps {
  tasks: Task[];
  loading: boolean;
  onDelete: (id: number) => void;
  onEditClick: (task: Task) => void;
  onCreate: (title: string) => Promise<void>;
}

const TaskView = ({ tasks, loading, onDelete, onEditClick, onCreate }: TaskViewProps) => {

  if (loading) return <div className="p-10 text-center text-slate-500">Cargando...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
      {tasks?. map((task) => (
        <div key={task.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <h3 className="text-white font-bold text-lg mb-1">{task.title}</h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">{task.description}</p>
          
          <div className="flex justify-between items-center">
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${task.completed ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {task.completed ? 'COMPLETADA' : 'PENDIENTE'}
            </span>

            {/* proyecto al que pertenece la tarea */}
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-400">
              {task?.project?.name || 'Sin Proyecto'}
            </span>
            
            <div className="flex gap-3">
              <button onClick={() => onEditClick(task)} className="text-blue-400 hover:text-blue-300 text-sm font-medium">Editar</button>
              <button onClick={() => onDelete(task.id)} className="text-red-500/70 hover:text-red-400 text-sm font-medium">Borrar</button>
            </div>
          </div>
        </div>
      ))}
      <CreateTaskCard onCreate={onCreate} />
    </div>
  );
};

export default TaskView;