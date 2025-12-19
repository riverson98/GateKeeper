import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../domain/entities/user.entity';

export class UserOutputDto {
  @ApiProperty({
    description: 'Identificador unico do usuário',
    example: 'uuid-123-456',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Trafalgar Law',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'TrafalgarLaw@exemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'cargo do usuário',
    example: 'ADMIN',
  })
  role: UserRole;

  @ApiProperty({
    description: 'Data de criação',
  })
  createdAt: Date | null;

  @ApiProperty({
    description: 'Data de atualização',
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'Data de deleção',
  })
  deletedAt: Date | null;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.role = props.role;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
