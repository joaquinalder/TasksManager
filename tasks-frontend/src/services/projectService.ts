import api from '../api/axios';
import type { Project } from "../types/project.types";


export const projectService = {
    getAll: async (signal?: AbortSignal): Promise<Project[]> => {
        const { data } = await api.get<Project[]>('/projects', { signal });
        return data;
    },

    create: async (project: Partial<Project>): Promise<Project> => {
        const { data } = await api.post<Project>('/projects', project);
        return data;
    },

    update: async (id: number, projectData: Partial<Project>): Promise<Project> => {
        const { data } = await api.patch<Project>(`/projects/${id}`, projectData);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`projects/${id}`);
    },
}