import { GenericContracts } from 'src/shared/domain/contracts/generic.contracts';
import { ResidentEntity } from '../entities/resident.entity';

export interface ResidentFilter {
  id?: string;
  name?: string;
  email?: string;
}

export abstract class ResidentContracts extends GenericContracts<
  ResidentEntity,
  ResidentFilter
> {
  abstract findByUnitNumber(code: string): Promise<ResidentEntity | null>;
}
