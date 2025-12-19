import { NotFoundError } from 'src/shared/errors/not-found-error';
import {
  UserContracts,
  UserFilter,
} from '../../domain/contracts/user.contracts';
import { UserMapper } from '../mappers/user.mapper';
import { UserOutputDto } from '../dtos/user-output.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserUseCase {
  constructor(private repo: UserContracts) {}

  async execute(filter: UserFilter): Promise<UserOutputDto> {
    const userFound = await this.repo.findOne(filter);

    if (!userFound) {
      throw new NotFoundError('User not found in our database sorry...');
    }

    return UserMapper.toOutput(userFound);
  }
}
