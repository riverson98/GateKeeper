import { GenericContracts } from 'src/shared/domain/contracts/generic.contracts';
import { GenericEntity } from 'src/shared/domain/entities/generic.entity';

export abstract class InMemoryImplContracts<E extends GenericEntity>
  implements GenericContracts<E>
{
  id = 0;
  entities: E[] = [];

  save(entity: E): Promise<E> {
    this.entities.push(entity);
    return Promise.resolve(entity);
  }

  private async find(filter: Partial<E>): Promise<E[]> {
    const entityFound = this.entities.filter((entity) => {
      const filterKeys = Object.keys(filter) as Array<keyof E>;

      return filterKeys.every((key) => {
        const filterValue = filter[key];
        const itemValue = entity[key];

        if (filterValue === undefined || filterValue === null) return true;

        return String(itemValue) === String(filterValue);
      });
    });

    return Promise.resolve(entityFound);
  }

  async findAll(): Promise<E[]> {
    return Promise.resolve(this.entities);
  }

  async findOne(filter: Partial<E>): Promise<E | null> {
    const entities = await this.find(filter);

    const entity = entities[0];

    return Promise.resolve(entity || null);
  }

  async update(entity: E): Promise<E> {
    const entityId = entity.id;

    const index = this.entities.findIndex((item) => item.id === entityId);

    if (index !== -1) {
      this.entities[index] = entity;
    }

    return Promise.resolve(entity);
  }
}
