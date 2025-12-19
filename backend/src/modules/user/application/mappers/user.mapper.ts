import { UserEntity } from '../../domain/entities/user.entity';
import { UserOutputDto } from '../dtos/user-output.dto';

export class UserMapper {
  static toOutput(user: UserEntity): UserOutputDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt || null,
      updatedAt: user.updatedAt || null,
      deletedAt: user.deletedAt || null,
    };
  }
}
