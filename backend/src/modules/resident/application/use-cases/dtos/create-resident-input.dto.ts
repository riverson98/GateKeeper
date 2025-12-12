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

export class CreateResidentInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  phone: string;

  @ValidateNested()
  @Type(() => UnitInputDto)
  public unit: UnitInputDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DeliveryCodeInputDto)
  deliveryCodes?: DeliveryCodeInputDto[];
}
