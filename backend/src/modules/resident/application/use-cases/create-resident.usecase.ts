import { Injectable } from '@nestjs/common';
import { ResidentContracts } from '../../domain/contracts/resident.contracts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResidentOutputDto } from './dtos/resident-output.dto';
import { ResidentEntity } from '../../domain/entities/resident.entity';
import { CreateResidentInputDto } from './dtos/create-resident-input.dto';
import { ResidentMapper } from './mappers/resident.mapper';

@Injectable()
export class CreateResidentUseCase {
  constructor(
    private repo: ResidentContracts,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(
    createResidentDto: CreateResidentInputDto,
  ): Promise<ResidentOutputDto> {
    const resident = ResidentEntity.create(
      createResidentDto.name,
      createResidentDto.phone,
      createResidentDto.unit.number,
      createResidentDto.unit.complement,
    );

    if (
      createResidentDto.deliveryCodes &&
      createResidentDto.deliveryCodes.length > 0
    ) {
      createResidentDto.deliveryCodes.forEach((dc) => {
        resident.addDeliveryCode(dc.code, dc.provider);
      });
    }

    await this.repo.save(resident);

    this.eventEmitter.emit('delivery.created', resident);

    return ResidentMapper.toOutput(resident);
  }
}
