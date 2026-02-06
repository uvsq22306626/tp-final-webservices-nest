import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Updated title' })
  title?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2026-02-06T13:00:00.000Z' })
  startedAt?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true })
  isCompleted?: boolean;
}
