import { Module } from '@nestjs/common';
import { ResidentImplContracts } from './infrastructure/repositories/resident.implcontracts';
import { ResidentController } from './infrastructure/controller/resident.controller';
import { FindResidentUseCase } from './application/use-cases/find-resident.usecase';
import { CreateResidentUseCase } from './application/use-cases/create-resident.usecase';
import { FindAllResidentUseCase } from './application/use-cases/find-all-resident.usecase';
import { UpdateResidentUseCase } from './application/use-cases/update-resident.usecase';
import { DeleteResidentUseCase } from './application/use-cases/delete-resident.usecase';
import { ResidentContracts } from './domain/contracts/resident.contracts';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  providers: [
    {
      provide: ResidentContracts,
      useClass: ResidentImplContracts,
    },
    FindResidentUseCase,
    CreateResidentUseCase,
    FindAllResidentUseCase,
    UpdateResidentUseCase,
    DeleteResidentUseCase,
  ],
  exports: [],
  controllers: [ResidentController],
  imports: [SharedModule],
})
export class ResidentModule {}
