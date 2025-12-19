import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UnitInputDto {
  @ApiProperty({
    description: 'Numero do apartamento',
    example: '101',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number: string;

  @ApiProperty({
    description: 'Complemento',
    example: 'Torre A',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  complement: string;
}
