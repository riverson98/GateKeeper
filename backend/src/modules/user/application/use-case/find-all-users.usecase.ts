import { Injectable } from '@nestjs/common';
import { UserContracts } from '../../domain/contracts/user.contracts';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserOutputDto } from '../dtos/user-output.dto';
import { UserFilterMapper } from '../mappers/user-filter.mapper';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private repo: UserContracts) {}

  async execute(filter?: UserFilterDto): Promise<UserOutputDto[]> {
    const filterDomain = UserFilterMapper.toDomain(filter);

    const users = await this.repo.findAllWithFilter(filterDomain);

    return users.map((user) => UserMapper.toOutput(user));
  }
}
