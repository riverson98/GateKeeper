import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../application/use-case/create-user.usecase';
import { UpdateUserUseCase } from '../../application/use-case/update-user.usecase';
import { FindUserUseCase } from '../../application/use-case/find-user.usecase';
import { DeleteUserUseCase } from '../../application/use-case/delete-user.usecase';
import { CreateUserInputDto } from '../../application/dtos/create-user-input.dto';
import { UpdateUserInputDto } from '../../application/dtos/update-user-input.dto';
import { FindAllUsersUseCase } from '../../application/use-case/find-all-users.usecase';
import { UserFilterDto } from '../../application/dtos/user-filter.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly updateUseCase: UpdateUserUseCase,
    private readonly findUseCase: FindUserUseCase,
    private readonly deleteUseCase: DeleteUserUseCase,
    private readonly findAllUseCase: FindAllUsersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um admin para o sistema' })
  @ApiResponse({ status: 201, description: 'Admin criado com sucesso.' })
  @ApiResponse({
    status: 422,
    description: 'Dados inválidos (Validation Error).',
  })
  @ApiResponse({ status: 409, description: 'Admin já existe.' })
  async create(@Body() createUserInputDto: CreateUserInputDto) {
    return this.createUseCase.execute(createUserInputDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Busca um admin especifico pelo o ID',
  })
  @ApiResponse({ status: 200, description: 'Admin encontrado' })
  @ApiResponse({ status: 404, description: 'Admin não encontrado' })
  async findById(@Param('id') id: string) {
    return this.findUseCase.execute({ id });
  }

  @Get()
  @ApiOperation({
    summary: 'Busca todos os admins com filtros opcionais',
  })
  @ApiResponse({ status: 200, description: 'Admin encontrado' })
  @ApiResponse({ status: 404, description: 'Admin não encontrado' })
  async findAll(@Query() query?: UserFilterDto) {
    return this.findAllUseCase.execute(query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um Admin' })
  @ApiResponse({ status: 200, description: 'Admin Atualizado' })
  @ApiResponse({ status: 404, description: 'Admin não encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserInputDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Apaga um admin (soft delete)' })
  @ApiResponse({ status: 200, description: 'Admin apagado' })
  @ApiResponse({ status: 404, description: 'Admin não encontrado' })
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}
