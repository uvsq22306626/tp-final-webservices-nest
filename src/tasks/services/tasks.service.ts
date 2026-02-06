import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../task.interface';

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        {
            id: 1,
            title: 'Task 1',
            startedAt: new Date(),
            isCompleted: false,
        },
        {
            id: 2,
            title: 'Task 2',
            startedAt: new Date(),
            isCompleted: true,
        },
    ];

    findAll(): Task[] {
        return this.tasks;
    }

    findByTitle(title: string): Task {
        const task = this.tasks.find((t) => t.title === title);
        if (!task) throw new NotFoundException(`Task with title "${title}" not found`);
        return task;
    }

    create(taskData: Omit<Task, 'id'>): Task {
        const nextId = this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
        const task: Task = { id: nextId, ...taskData };
        this.tasks.push(task);
        return task;
    }

    patch(id: number, partial: Partial<Omit<Task, 'id'>>): Task {
        const idx = this.tasks.findIndex((t) => t.id === id);
        if (idx === -1) throw new NotFoundException(`Task with id ${id} not found`);
        
        const updated: Task = {
             ...this.tasks[idx],
             ...partial,
            startedAt: partial.startedAt instanceof Date 
              ? partial.startedAt 
              : partial.startedAt 
                ? new Date(partial.startedAt as any)
                : this.tasks[idx].startedAt,
        };
        this.tasks[idx] = updated;
        return updated;
        }
        remove(id: number): void {
            const before = this.tasks.length;
            this.tasks = this.tasks.filter((t) => t.id !== id);
            if (this.tasks.length === before) {
                throw new NotFoundException(`Task with id ${id} not found`)
            }
        ;
    }
}