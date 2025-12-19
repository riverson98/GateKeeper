import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por e-mail exato' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Filtrar por nome (contém)' })
  @IsOptional()
  @IsString()
  name?: string;
}
