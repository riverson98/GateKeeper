import { InMemoryImplContracts } from 'src/shared/infrastructure/repositories/in-memory/in-memory.implcontracts';
import { ResidentContracts } from '../../domain/contracts/resident.contracts';
import { ResidentEntity } from '../../domain/entities/resident.entity';

export class ResidentImplContracts
  extends InMemoryImplContracts<ResidentEntity>
  implements ResidentContracts {}
