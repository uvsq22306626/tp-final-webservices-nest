import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import type { Task } from '../task.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

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
    create(@Body() dto: CreateTaskDto,): Task {
        return this.tasksService.create({
            title: dto.title,
            startedAt: new Date(dto.startedAt),
            isCompleted: dto.isCompleted,
        })
            
    };
    @Patch(':id')
    patch(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTaskDto,
    ): Task {
        return this.tasksService.patch(id, {
            title: dto.title,
            startedAt: dto.startedAt ? new Date(dto.startedAt) : undefined,
            isCompleted: dto.isCompleted,
    });
    }

     @Delete(':id')
    @HttpCode(204) // cohérent : no content
    remove(@Param('id', ParseIntPipe) id: number): void {
        return this.tasksService.remove(id);
    }



}
