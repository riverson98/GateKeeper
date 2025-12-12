import { GenericEntity } from '../entities/generic.entity';

export interface ResidentFilter {
  id?: string;
  email?: string;
  name?: string;
  deliveryCode?: string;
}

export abstract class GenericContracts<E extends GenericEntity> {
  abstract save(entity: E): Promise<E>;
  abstract findOne(filter: ResidentFilter): Promise<E | null>;
  abstract findAll(): Promise<E[]>;
  abstract update(entity: E): Promise<E>;
}
