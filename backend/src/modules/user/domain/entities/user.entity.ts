import { GenericEntity } from 'src/shared/domain/entities/generic.entity';
import { EntityValidationError } from 'src/shared/errors/entity-validation-error';

export type UserRole = 'USER' | 'ADMIN';

export class UserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class UserEntity extends GenericEntity {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
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

  update(props: Partial<UserProps>) {
    if (props.name) this.changeName(props.name);
    if (props.role) this.props.role = props.role;
    if (props.password) this.props.password = props.password;

    this.props.updatedAt = new Date();
  }

  public delete(): void {
    if (!this.isActive()) return;

    this.props.deletedAt = new Date();
    this.props.updatedAt = new Date();
  }

  public isActive(): boolean {
    return !this.props.deletedAt;
  }

  static create(props: UserProps, id?: string) {
    return new UserEntity(props, id);
  }

  static validate(props: UserProps) {
    const errors: Record<string, string[]> = {};

    if (typeof props.name !== 'string') {
      errors.name = ['name must be a string'];
    } else {
      const trimmedName = props.name.trim();
      if (trimmedName.length < 3 || trimmedName.length > 100) {
        errors.name = ['name must have at least 3 and at most 100 characters'];
      }
    }

    if (typeof props.email !== 'string') {
      errors.email = ['email must be a string'];
    } else if (!props.email.trim()) {
      errors.email = ['email must not be empty'];
    } else if (!props.email.includes('@')) {
      errors.email = ['the field must be a valid e-mail'];
    }

    if (Object.keys(errors).length) {
      throw new EntityValidationError(errors);
    }
  }
}
