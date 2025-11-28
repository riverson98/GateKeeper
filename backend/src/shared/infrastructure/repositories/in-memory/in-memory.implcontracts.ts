import { GenericContracts } from 'src/shared/domain/contracts/generic.contracts';
import { GenericEntity } from 'src/shared/domain/entities/generic.entity';
import { NotFoundError } from 'src/shared/errors/not-found-error';

export abstract class InMemoryImplContracts<E extends GenericEntity>
  implements GenericContracts<E>
{
  id = 0;
  entities: E[] = [];

  save(entity: E): Promise<E> {
    this.entities.push(entity);
    return Promise.resolve(entity);
  }

  findByPredicate(predicate: (item: E) => boolean): Promise<E> {
    const residentFound = this.entities.find(predicate);

    if (!residentFound) {
      throw new NotFoundError('Resident not found');
    }

    return Promise.resolve(residentFound);
  }

  findAll(): Promise<E[]> {
    return Promise.resolve(this.entities);
  }

  async delete(id: string): Promise<void> {
    const userFound = await this.findByPredicate((entity) => entity.id === id);

    this.entities = this.entities.filter(
      (entity) => entity.id !== userFound.id,
    );

    return Promise.resolve(undefined);
  }
}
