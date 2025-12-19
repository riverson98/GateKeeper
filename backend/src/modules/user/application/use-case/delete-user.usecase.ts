import { NotFoundError } from 'src/shared/errors/not-found-error';
import { UserContracts } from '../../domain/contracts/user.contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(private repo: UserContracts) {}

  async execute(id: string) {
    const userFound = await this.repo.findOne({ id });

    if (!userFound) {
      throw new NotFoundError('User not found in our database sorry...');
    }

    userFound.delete();

    await this.repo.update(userFound);
  }
}
