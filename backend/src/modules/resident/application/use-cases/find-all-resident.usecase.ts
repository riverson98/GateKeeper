import { Injectable } from '@nestjs/common';
import { ResidentContracts } from '../../domain/contracts/resident.contracts';

@Injectable()
export class FindAllResidentUseCase {
  constructor(private residentRepo: ResidentContracts) {}

  async execute() {
    return this.residentRepo.findAll();
  }
}
