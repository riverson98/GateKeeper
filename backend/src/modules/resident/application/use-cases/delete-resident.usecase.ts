import { NotFoundError } from 'src/shared/errors/not-found-error';
import { ResidentContracts } from '../../domain/contracts/resident.contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteResidentUseCase {
  constructor(private residentRepo: ResidentContracts) {}

  async execute(id: string): Promise<void> {
    const resident = await this.residentRepo.findOne({ id });

    if (!resident) {
      throw new NotFoundError('Sorry, resident not found in our database');
    }

    resident.delete();

    await this.residentRepo.update(resident);
  }
}
