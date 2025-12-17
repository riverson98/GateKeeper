import {
  ResidentEntity,
  ResidentProps,
} from 'src/modules/resident/domain/entities/resident.entity';
import { ResidentOutputDto } from '../dtos/resident-output.dto';
import { UpdateResidentInputDto } from '../dtos/update-resident-input.dto';
import { UnitObjectValue } from 'src/modules/resident/domain/object-value/unit.object-value';
import { DeliveryIdentifierObjectValue } from 'src/modules/resident/domain/object-value/delivery-identifier.object-value';

export class ResidentMapper {
  static toOutput(entity: ResidentEntity): ResidentOutputDto {
    return {
      id: entity.id,
      name: entity.name,
      phone: entity.phone,

      unitNumber: entity.unit.number,
      unitComplement: entity.unit.complement,

      deliveryCodes:
        entity.props.deliveryCodes?.map((dc) => ({
          code: dc.code,
          provider: dc.provider,
        })) || [],

      createdAt: entity.props.createdAt!,
      updatedAt: entity.props.updatedAt!,
    };
  }

  static toUpdateProps(dto: UpdateResidentInputDto): Partial<ResidentProps> {
    const props: Partial<ResidentProps> = {};

    if (dto.name) props.name = dto.name;
    if (dto.phone) props.phone = dto.phone;

    if (dto.unit) {
      props.unit = UnitObjectValue.create({
        number: dto.unit.number,
        complement: dto.unit.complement,
      });
    }

    if (dto.deliveryCodes) {
      props.deliveryCodes = dto.deliveryCodes.map((dc) =>
        DeliveryIdentifierObjectValue.create(dc),
      );
    }

    return props;
  }
}
