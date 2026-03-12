
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  projectId?: number | undefined;
  project?: {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
  }
}

export type CreateTaskInput = Pick<Task, 'title' | 'description' | 'completed'>;