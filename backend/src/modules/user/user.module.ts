import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserContracts } from './domain/contracts/user.contracts';
import { UserImplContracts } from './infrastructure/repositories/user.impl-contracts';
import { CreateUserUseCase } from './application/use-case/create-user.usecase';
import { FindUserUseCase } from './application/use-case/find-user.usecase';
import { UpdateUserUseCase } from './application/use-case/update-user.usecase';
import { UserController } from './infrastructure/controller/user.controller';
import { DeleteUserUseCase } from './application/use-case/delete-user.usecase';
import { FindAllUsersUseCase } from './application/use-case/find-all-users.usecase';

@Module({
  providers: [
    {
      provide: UserContracts,
      useClass: UserImplContracts,
    },
    CreateUserUseCase,
    FindUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindAllUsersUseCase,
  ],
  exports: [UserContracts],
  controllers: [UserController],
  imports: [SharedModule],
})
export class UserModule {}
