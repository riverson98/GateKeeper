import { EntityValidationError } from 'src/shared/errors/entity-validation-error';

export type DeliveryProvider = 'IFOOD' | 'MERCADO_LIVRE' | 'SHOPEE';

export class DeliveryIdentifierProps {
  code: string;
  provider: DeliveryProvider;
}

export class DeliveryIdentifierObjectValue {
  constructor(public readonly props: DeliveryIdentifierProps) {
    DeliveryIdentifierObjectValue.validate(props);
  }

  get code(): string {
    return this.props.code;
  }

  set code(newCode: string) {
    this.props.code = newCode;
  }

  get provider(): DeliveryProvider {
    return this.props.provider;
  }

  set provider(newProvider: DeliveryProvider) {
    this.props.provider = newProvider;
  }

  static create(props: DeliveryIdentifierProps): DeliveryIdentifierObjectValue {
    return new DeliveryIdentifierObjectValue(props);
  }

  static validate(props: DeliveryIdentifierProps) {
    const errors: Record<string, string[]> = {};

    if (typeof props.code !== 'string') {
      errors.code = ['the code must be a string'];
    }

    if (props.provider === 'IFOOD') {
      if (!/^\d{4}$/.test(props.code)) {
        errors.provider = [
          'the code of the provider ifood must be a 4 characters',
        ];
      }
    }

    if (Object.keys(errors).length) {
      throw new EntityValidationError(errors);
    }
  }
}
