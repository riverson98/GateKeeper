import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ProviderEnum {
  IFOOD = 'IFOOD',
  MERCADO_LIVRE = 'MERCADO_LIVRE',
  SHOPEE = 'SHOPEE',
}

export class DeliveryCodeInputDto {
  @ApiProperty({
    description: 'Codigo de entrega',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Plataforma de entrega',
    example: 'IFOOD',
  })
  @IsEnum(ProviderEnum)
  provider: ProviderEnum;
}
