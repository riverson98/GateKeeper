import { UserFilter } from '../../domain/contracts/user.contracts';
import { UserFilterDto } from '../dtos/user-filter.dto';

export class UserFilterMapper {
  static toDomain(dto?: UserFilterDto): UserFilter | undefined {
    if (!dto) return undefined;

    return {
      name: dto.name,
      email: dto.email,
    };
  }
}
