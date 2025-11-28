import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ProviderEnum {
  IFOOD = 'IFOOD',
  MERCADO_LIVRE = 'MERCADO_LIVRE',
  SHOPEE = 'SHOPEE',
}

export class DeliveryCodeInputDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(ProviderEnum)
  provider: ProviderEnum;
}
