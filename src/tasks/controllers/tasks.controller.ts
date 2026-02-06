import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import type { Task } from '../task.interface';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll(): Task[] {
        return this.tasksService.findAll();
    }

    @Get('by-title/:title')
    findByTitle(@Param('title') title: string): Task {
        return this.tasksService.findByTitle(title);
    }
    
     @Post()
    create(
        @Body()
        body: { title: string; startedAt: string; isCompleted: boolean },
    ): Task {
        return this.tasksService.create({
        title: body.title,
        startedAt: new Date(body.startedAt),
        isCompleted: body.isCompleted,
        });
    }
    @Patch(':id')
    patch(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Partial<{ title: string; startedAt: string; isCompleted: boolean }>,
    ): Task {
        return this.tasksService.patch(id, {
        title: body.title,
        startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
        isCompleted: body.isCompleted,
        });
    }

     @Delete(':id')
    @HttpCode(204) // cohérent : no content
    remove(@Param('id', ParseIntPipe) id: number): void {
        return this.tasksService.remove(id);
    }



}
