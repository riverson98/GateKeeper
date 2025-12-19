import { PrismaService } from 'src/shared/infrastructure/repositories/db/prisma.service';
import {
  UserContracts,
  UserFilter,
} from '../../domain/contracts/user.contracts';
import { UserEntity } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserPrismaMapper } from './mappers/user-prisma.mapper';

@Injectable()
export class UserImplContracts implements UserContracts {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: UserEntity): Promise<void> {
    const rawData = UserPrismaMapper.toPrisma(entity);

    await this.prisma.user.create({
      data: rawData,
    });
  }

  async findOne(filter: UserFilter): Promise<UserEntity | null> {
    const prismaResult = await this.prisma.user.findFirst({
      where: {
        ...filter,
        deletedAt: null,
      },
    });

    if (!prismaResult) {
      return null;
    }

    return UserPrismaMapper.toDomain(prismaResult);
  }

  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findAllWithFilter(filter?: UserFilter): Promise<UserEntity[]> {
    const prismaResult = await this.prisma.user.findMany({
      where: {
        ...filter,
        deletedAt: null,
      },
    });

    return prismaResult.map((raw) => UserPrismaMapper.toDomain(raw));
  }

  async update(entity: UserEntity): Promise<void> {
    const rawData = UserPrismaMapper.toPrisma(entity);

    await this.prisma.user.update({
      where: { id: entity.id },
      data: { ...rawData },
    });
  }
}
