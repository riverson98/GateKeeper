import { ResidentEntity } from 'src/modules/resident/domain/entities/resident.entity';
import { ResidentOutputDto } from '../dtos/resident-output.dto';

export class ResidentMapper {
  static toOutput(entity: ResidentEntity): ResidentOutputDto {
    return {
      id: entity.id,
      name: entity.props.name,
      phone: entity.props.phone,

      unitNumber: entity.props.unit.props.number,
      unitComplement: entity.props.unit.props.complement,

      deliveryCodes:
        entity.props.deliveryCodes?.map((dc) => ({
          code: dc.props.code,
          provider: dc.props.provider,
        })) || [],

      createdAt: entity.props.createdAt!,
    };
  }
}
