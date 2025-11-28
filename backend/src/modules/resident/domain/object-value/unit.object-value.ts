import { EntityValidationError } from 'src/shared/errors/entity-validation-error';

export type DeliveryProvider = 'IFOOD' | 'MERCADO_LIVRE' | 'SHOPEE';

export class UnitProps {
  number: string;
  complement: string;
}
export class UnitObjectValue {
  constructor(public readonly props: UnitProps) {
    UnitObjectValue.validate(this.props);
  }

  static create(props: UnitProps): UnitObjectValue {
    return new UnitObjectValue(props);
  }

  static validate(props: UnitProps) {
    const errors: Record<string, string[]> = {};

    if (typeof props.number !== 'string') {
      errors.number = ['the number must be a string'];
    } else {
      const trimmedNumber = props.number.trim();
      if (trimmedNumber.length < 0 || trimmedNumber.length > 10) {
        errors.number = ['name must have at least 1 and at most 10 characters'];
      }
    }

    if (typeof props.complement !== 'string') {
      errors.complement = ['the complement must be a string'];
    }

    if (!props.complement) {
      errors.complement = ['the complement cannot be empty'];
    }

    if (Object.keys(errors).length) {
      throw new EntityValidationError(errors);
    }
  }
}
