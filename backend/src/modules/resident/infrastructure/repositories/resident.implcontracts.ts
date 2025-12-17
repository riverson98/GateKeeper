import { ResidentEntity } from '../../domain/entities/resident.entity';
import {
  ResidentContracts,
  ResidentFilter,
} from '../../domain/contracts/resident.contracts';
import { ResidentPrismaMapper } from './mappers/resident-prisma.repository';
import { PrismaService } from 'src/shared/infrastructure/repositories/db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResidentImplContracts implements ResidentContracts {
  constructor(private readonly prisma: PrismaService) {}

  async findByUnitNumber(number: string): Promise<ResidentEntity | null> {
    const prismaResult = await this.prisma.resident.findFirst({
      where: {
        unitNumber: number,
        deletedAt: null,
      },

      include: {
        deliveryCodes: true,
      },
    });

    if (!prismaResult) {
      return null;
    }

    return ResidentPrismaMapper.toDomain(prismaResult);
  }

  async save(entity: ResidentEntity): Promise<void> {
    const rawData = ResidentPrismaMapper.toPrisma(entity);

    const deliveryCodeRelation = {
      create: entity.deliveryCodes?.map((dc) => ({
        code: dc.code,
        provider: dc.provider,
      })),
    };

    const residentData = {
      ...rawData,
      deliveryCodes: deliveryCodeRelation,
    };

    await this.prisma.resident.create({
      data: residentData,
    });
  }

  async findOne(filter: ResidentFilter): Promise<ResidentEntity | null> {
    const prismaResult = await this.prisma.resident.findFirst({
      where: {
        ...filter,
        deletedAt: null,
      },
      include: {
        deliveryCodes: true,
      },
    });

    if (!prismaResult) {
      return null;
    }

    return ResidentPrismaMapper.toDomain(prismaResult);
  }

  findAll(): Promise<ResidentEntity[]> {
    throw new Error('Method not implemented.');
  }

  async update(entity: ResidentEntity): Promise<void> {
    const rawData = ResidentPrismaMapper.toPrisma(entity);

    const deliveryCodesStrategy = {
      deleteMany: {},

      create: entity.deliveryCodes?.map((dc) => ({
        code: dc.code,
        provider: dc.provider,
      })),
    };

    await this.prisma.resident.update({
      where: { id: entity.id },
      data: {
        ...rawData,
        deliveryCodes: deliveryCodesStrategy,
      },
    });
  }
}
