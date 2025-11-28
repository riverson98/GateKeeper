export class DeliveryCodeDto {
  code: string;
  provider: string;
}

export class ResidentOutputDto {
  id: string;
  name: string;
  phone: string;
  unitNumber: string;
  unitComplement: string;
  deliveryCodes: DeliveryCodeDto[];
  createdAt: Date;

  constructor(props: {
    id: string;
    name: string;
    phone: string;
    unitNumber: string;
    unitComplement: string;
    deliveryCodes: DeliveryCodeDto[];
    createdAt: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.unitNumber = props.unitNumber;
    this.deliveryCodes = props.deliveryCodes;
    this.createdAt = props.createdAt;
  }
}
