import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInputDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Trafalgar Law',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'email do usuário',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'senha do usuário minimo 6 caracteres, 1 letra minuscula 1 maiuscula 1 numero e 1 simbolo',
    example: 'ElCo@1',
  })
  @IsStrongPassword({
    minUppercase: 1,
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    description: 'cargo do usuário',
    example: 'ADMIN',
  })
  @IsNotEmpty()
  role: UserRole;
}
