import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UnitInputDto } from './unit-input.dto';
import { DeliveryCodeInputDto } from './delivery-code-input.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResidentInputDto {
  @ApiProperty({
    description: 'Nome completo do morador',
    example: 'Monkey D. Luffy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Celular com DDD',
    example: '47999998888',
  })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Dados da unidade (Apartamento)' })
  @ValidateNested()
  @Type(() => UnitInputDto)
  public unit: UnitInputDto;

  @ApiProperty({ description: 'Dados dos codigos de entregas (cliente)' })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DeliveryCodeInputDto)
  deliveryCodes?: DeliveryCodeInputDto[];
}
