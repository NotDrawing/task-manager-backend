import type { Task } from '../models/task.js';

export const tasks: Task[] = [
    {
        id: 1,
        title: 'Configurar el proyecto backend',
        status: 'completed',
        createdAt: new Date('2026-01-15T10:00:00')
    },
    {
        id: 2,
        title: 'Practicar TypeScript',
        status: 'pending',
        createdAt: new Date('2026-01-16T09:30:00')
    },
    {
        id: 3,
        title: 'Diseñar la base de datos',
        status: 'pending',
        createdAt: new Date('2026-01-17T14:20:00')
    },
    {
        id: 4,
        title: 'Escribir pruebas unitarias',
        status: 'completed',
        createdAt: new Date('2026-01-18T11:15:00')
    },
    {
        id: 5,
        title: 'Revisar pull requests',
        status: 'pending',
        createdAt: new Date('2026-01-19T08:45:00')
    }
];