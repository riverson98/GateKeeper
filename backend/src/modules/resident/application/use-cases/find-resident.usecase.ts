import { Injectable } from '@nestjs/common';
import {
  ResidentContracts,
  ResidentFilter,
} from '../../domain/contracts/resident.contracts';
import { ResidentOutputDto } from './dtos/resident-output.dto';
import { ResidentMapper } from './mappers/resident.mapper';
import { NotFoundError } from 'src/shared/errors/not-found-error';

@Injectable()
export class FindResidentUseCase {
  constructor(private readonly residentRepo: ResidentContracts) {}

  async execute(filter: ResidentFilter): Promise<ResidentOutputDto> {
    const resident = await this.residentRepo.findOne(filter);

    if (!resident) {
      throw new NotFoundError('Sorry, resident not found in our database');
    }

    return ResidentMapper.toOutput(resident);
  }
}
