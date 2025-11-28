import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UnitInputDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  number: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  complement: string;
}
