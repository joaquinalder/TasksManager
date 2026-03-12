import type { Task } from "./task.types";

export interface Project{
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    tasks: Task[];
}