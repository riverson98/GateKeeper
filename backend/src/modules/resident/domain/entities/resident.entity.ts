import {
  DeliveryProvider,
  UnitObjectValue,
  UnitProps,
} from '../object-value/unit.object-value';
import { DeliveryIdentifierObjectValue } from '../object-value/delivery-identifier.object-value';
import { GenericEntity } from 'src/shared/domain/entities/generic.entity';
import { EntityValidationError } from 'src/shared/errors/entity-validation-error';

export class ResidentProps {
  name: string;
  phone: string;
  unit: UnitObjectValue;
  deliveryCodes?: DeliveryIdentifierObjectValue[] = [];
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class ResidentEntity extends GenericEntity {
  constructor(
    public readonly props: ResidentProps,
    id?: string,
  ) {
    ResidentEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get unit(): UnitObjectValue {
    return this.props.unit;
  }

  get deliveryCodes() {
    return this.props.deliveryCodes;
  }

  get id() {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get phone(): string {
    return this.props.phone;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  changeName(newName: string): void {
    this.props.name = newName;
  }

  changePhone(email: string): void {
    this.props.phone = email;
  }

  relocateTo(unitProps: UnitProps) {
    this.props.unit = UnitObjectValue.create(unitProps);
  }

  addDeliveryCode(code: string, provider: DeliveryProvider) {
    const exists = this.props.deliveryCodes?.find(
      (d) => d.provider === provider,
    );

    if (exists) {
      this.props.deliveryCodes = this.props.deliveryCodes?.filter(
        (d) => d.provider !== provider,
      );
    }

    const deliveryProps = { code, provider };

    this.props.deliveryCodes?.push(
      DeliveryIdentifierObjectValue.create(deliveryProps),
    );
  }

  hasDeliveryCode(searchCode: string): boolean {
    return (
      this.props.deliveryCodes?.some((d) => d.code === searchCode) ?? false
    );
  }

  update(props: Partial<ResidentProps>) {
    if (props.name) this.changeName(props.name);
    if (props.phone) this.changePhone(props.phone);
    if (props.unit) this.relocateTo(props.unit.props);
    if (props.deliveryCodes) this.props.deliveryCodes = props.deliveryCodes;

    this.props.updatedAt = new Date();
  }

  static create(props: ResidentProps, id?: string): ResidentEntity {
    const propsWithDefaults = {
      ...props,
      deliveryCodes: props.deliveryCodes ?? [],
    };

    const resident = new ResidentEntity(propsWithDefaults, id);

    return resident;
  }

  static validate(props: ResidentProps) {
    const errors: Record<string, string[]> = {};

    if (typeof props.name !== 'string') {
      errors.name = ['name must be a string'];
    } else {
      const trimmedName = props.name.trim();
      if (trimmedName.length < 3 || trimmedName.length > 100) {
        errors.name = ['name must have at least 3 and at most 100 characters'];
      }
    }

    if (typeof props.phone !== 'string') {
      errors.phone = ['phone must be a string'];
    } else if (!props.phone.trim()) {
      errors.phone = ['phone must not be empty'];
    }

    if (Object.keys(errors).length) {
      throw new EntityValidationError(errors);
    }
  }

  public delete(): void {
    if (!this.isActive()) return;

    this.props.deletedAt = new Date();
    this.props.updatedAt = new Date();
  }

  public isActive(): boolean {
    return !this.props.deletedAt;
  }
}
