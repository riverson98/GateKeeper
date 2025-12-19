import { NotFoundError } from 'src/shared/errors/not-found-error';
import { UserContracts } from '../../domain/contracts/user.contracts';
import { UpdateUserInputDto } from '../dtos/update-user-input.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserOutputDto } from '../dtos/user-output.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUseCase {
  constructor(private repo: UserContracts) {}

  async execute(
    id: string,
    updatedDto: UpdateUserInputDto,
  ): Promise<UserOutputDto> {
    const userFound = await this.repo.findOne({ id });

    if (!userFound) {
      throw new NotFoundError('User not found in our database sorry...');
    }

    let passwordHash = userFound.password;

    if (updatedDto.password) {
      passwordHash = await bcrypt.hash(updatedDto.password, 10);
    }

    userFound.update({
      name: updatedDto.name ?? userFound.name,
      role: updatedDto.role ?? userFound.role,
      password: passwordHash,
    });

    await this.repo.update(userFound);

    return UserMapper.toOutput(userFound);
  }
}
