import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { User } from '@prisma/client';

export class UserPrismaMapper {
  static toDomain(raw: User): UserEntity {
    return UserEntity.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.passwordHash,
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }

  static toPrisma(entity: UserEntity) {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      passwordHash: entity.password,
      role: entity.role,
      createdAt: entity.createdAt ?? new Date(),
      updatedAt: entity.updatedAt || null,
      deletedAt: entity.deletedAt || null,
    };
  }
}
