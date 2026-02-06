import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Task 3' })
  title: string;

  @IsDateString()
  @ApiProperty({ example: '2026-02-06T12:00:00.000Z' })
  startedAt: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  isCompleted: boolean;
}
