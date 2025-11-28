import { GenericEntity } from '../entities/generic.entity';

export abstract class GenericContracts<E extends GenericEntity> {
  abstract save(entity: E): Promise<E>;
  abstract findByPredicate(predicate: (item: E) => boolean): Promise<E>;
  abstract findAll(): Promise<E[]>;
  abstract delete(id: string): Promise<void>;
}
