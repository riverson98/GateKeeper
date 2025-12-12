import { PartialType } from '@nestjs/mapped-types';
import { CreateResidentInputDto } from './create-resident-input.dto';

export class UpdateResidentInputDto extends PartialType(
  CreateResidentInputDto,
) {
  id: string;
}
