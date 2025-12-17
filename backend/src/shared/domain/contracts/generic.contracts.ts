import { GenericEntity } from '../entities/generic.entity';

export abstract class GenericContracts<
  E extends GenericEntity,
  Filter = Partial<E>,
> {
  abstract save(entity: E): Promise<void>;
  abstract findOne(filter: Filter): Promise<E | null>;
  abstract findAll(): Promise<E[]>;
  abstract update(entity: E): Promise<void>;
}
