import { Injectable } from '@nestjs/common';
import { ResidentContracts } from '../../domain/contracts/resident.contracts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResidentOutputDto } from './dtos/resident-output.dto';
import { ResidentEntity } from '../../domain/entities/resident.entity';
import { CreateResidentInputDto } from './dtos/create-resident-input.dto';
import { ResidentMapper } from './mappers/resident.mapper';
import { UnitObjectValue } from '../../domain/object-value/unit.object-value';

@Injectable()
export class CreateResidentUseCase {
  constructor(
    private repo: ResidentContracts,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(
    createResidentDto: CreateResidentInputDto,
  ): Promise<ResidentOutputDto> {
    const unitProps = {
      number: createResidentDto.unit.number,
      complement: createResidentDto.unit.complement,
    } as UnitObjectValue;

    const resident = ResidentEntity.create({
      name: createResidentDto.name,
      phone: createResidentDto.phone,
      unit: unitProps,
    });

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
