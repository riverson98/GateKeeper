import { Injectable } from '@nestjs/common';
import { ResidentContracts } from '../../domain/contracts/resident.contracts';
import { UpdateResidentInputDto } from './dtos/update-resident-input.dto';
import { ResidentOutputDto } from './dtos/resident-output.dto';
import { NotFoundError } from 'src/shared/errors/not-found-error';
import { ResidentMapper } from './mappers/resident.mapper';

@Injectable()
export class UpdateResidentUseCase {
  constructor(private residentRepo: ResidentContracts) {}

  async execute(
    id: string,
    dto: UpdateResidentInputDto,
  ): Promise<ResidentOutputDto> {
    const resident = await this.residentRepo.findOne({ id });

    if (!resident) {
      throw new NotFoundError('Sorry, resident not found in our database');
    }

    const updateProps = ResidentMapper.toUpdateProps(dto);

    resident.update(updateProps);

    await this.residentRepo.update(resident);

    return ResidentMapper.toOutput(resident);
  }
}
