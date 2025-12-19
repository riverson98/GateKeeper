import { GenericContracts } from 'src/shared/domain/contracts/generic.contracts';
import { UserEntity } from '../entities/user.entity';

export class UserFilter {
  id?: string;
  name?: string;
  email?: string;
}

export abstract class UserContracts extends GenericContracts<
  UserEntity,
  UserFilter
> {
  abstract findAllWithFilter(filter?: UserFilter): Promise<UserEntity[]>;
}
