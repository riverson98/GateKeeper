import { Resident, DeliveryCode } from '@prisma/client';
import { ResidentEntity } from 'src/modules/resident/domain/entities/resident.entity';
import { DeliveryIdentifierObjectValue } from 'src/modules/resident/domain/object-value/delivery-identifier.object-value';
import {
  DeliveryProvider,
  UnitObjectValue,
} from 'src/modules/resident/domain/object-value/unit.object-value';

type ResidentWithRelations = Resident & {
  deliveryCodes?: DeliveryCode[];
};

export class ResidentPrismaMapper {
  static toDomain(raw: ResidentWithRelations): ResidentEntity {
    const unit = UnitObjectValue.create({
      number: raw.unitNumber,
      complement: raw.unitComplement,
    });

    const codes =
      raw.deliveryCodes?.map((c) =>
        DeliveryIdentifierObjectValue.create({
          code: c.code,
          provider: c.provider as DeliveryProvider,
        }),
      ) || [];

    return ResidentEntity.create(
      {
        name: raw.name,
        phone: raw.phone,
        unit: unit,
        deliveryCodes: codes,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }

  static toPrisma(entity: ResidentEntity) {
    return {
      id: entity.id,
      name: entity.name,
      phone: entity.phone,
      unitNumber: entity.unit.number,
      unitComplement: entity.unit.complement,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt ?? new Date(),
      deletedAt: entity.deletedAt || null,
    };
  }
}
