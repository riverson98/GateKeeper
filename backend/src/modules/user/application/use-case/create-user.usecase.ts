import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserContracts } from '../../domain/contracts/user.contracts';
import { CreateUserInputDto } from '../dtos/create-user-input.dto';
import { UserOutputDto } from '../dtos/user-output.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { ConflictError } from 'src/shared/errors/conflict-error';
import * as bcrypt from 'bcrypt';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private repo: UserContracts,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: CreateUserInputDto): Promise<UserOutputDto> {
    const userExists = await this.repo.findOne({ email: dto.email });

    if (userExists) {
      throw new ConflictError('Email already used');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = UserEntity.create({
      name: dto.name,
      email: dto.email,
      password: passwordHash,
      role: dto.role,
    });

    await this.repo.save(user);

    this.eventEmitter.emit('admin.created', user);

    return UserMapper.toOutput(user);
  }
}
