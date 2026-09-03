import {
    createTask,
    completeTask,
    listTasks,
    deleteTask,
    listPendingTasks,
} from './services/task.service.js';
import { delay } from './utils/delay.js';
import { getAppName } from './utils/env.js';

const showTasks = (): void => {
    const rows = listTasks().map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        createdAt: task.createdAt.toLocaleString()
    }));
    console.table(rows);
};

const showPending = (): void => {
    const pending = listPendingTasks();
    if (pending.length === 0) {
        console.log('No hay tareas pendientes.');
        return;
    }
    const rows = pending.map((task) => ({
        id: task.id,
        title: task.title,
        createdAt: task.createdAt.toLocaleString()
    }));
    console.table(rows);
};

const main = async (): Promise<void> => {
    console.log(`\n${getAppName()}`);
    console.log('Iniciando aplicación...');
    await delay(300);

    console.log('Todas las tareas iniciales');
    showTasks();

    console.log('Tareas pendientes iniciales');
    showPending();

    const newTask = createTask('Construir mi primer servicio');
    console.log(`Nueva tarea creada con id ${newTask.id}`);

    completeTask(newTask.id);
    console.log(`Tarea ${newTask.id} completada.`);

    console.log('Pendientes después de completar la nueva');
    showPending();

    const deleted = deleteTask(2);
    console.log(`Tarea eliminada: "${deleted.title}" (id ${deleted.id})`);

    console.log('Todas las tareas (final)');
    showTasks();

    console.log('Pendientes (final)');
    showPending();

    try {
        completeTask(999);
    } catch (error: unknown) {
        const message = error instanceof Error
            ? error.message
            : 'Ocurrió un error desconocido.';
        console.error(`Error controlado: ${message}`);
    }
};

main().catch((error: unknown) => {
    console.error('Error no controlado:', error);
    process.exitCode = 1;
});