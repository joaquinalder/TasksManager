import api from '../api/axios';
import type { Task, CreateTaskInput } from '../types/task.types';

export const taskService = {
  getAll: async (signal?: AbortSignal) => {
    const { data } = await api.get<Task[]>('/tasks', { signal });
    return data;
  },

  create: async (task: CreateTaskInput): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  update: async (id: number, taskData: Partial<Task>): Promise<Task> => {
    const { data } = await api.patch<Task>(`/tasks/${id}`, taskData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`tasks/${id}`);
  },

};