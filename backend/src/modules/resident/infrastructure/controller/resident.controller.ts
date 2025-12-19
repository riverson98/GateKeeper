import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateResidentUseCase } from '../../application/use-cases/create-resident.usecase';
import { CreateResidentInputDto } from '../../application/use-cases/dtos/create-resident-input.dto';
import { FindResidentUseCase } from '../../application/use-cases/find-resident.usecase';
import { FindAllResidentUseCase } from '../../application/use-cases/find-all-resident.usecase';
import { UpdateResidentInputDto } from '../../application/use-cases/dtos/update-resident-input.dto';
import { UpdateResidentUseCase } from '../../application/use-cases/update-resident.usecase';
import { DeleteResidentUseCase } from '../../application/use-cases/delete-resident.usecase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResidentFilter } from '../../domain/contracts/resident.contracts';

@ApiTags('residents')
@Controller('resident')
export class ResidentController {
  constructor(
    private readonly createResidentUseCase: CreateResidentUseCase,
    private readonly findResidentUseCase: FindResidentUseCase,
    private readonly findAllResidentUseCase: FindAllResidentUseCase,
    private readonly updateResidentUseCase: UpdateResidentUseCase,
    private readonly deleteResidentUseCase: DeleteResidentUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo morador' })
  @ApiResponse({ status: 201, description: 'Morador criado com sucesso.' })
  @ApiResponse({
    status: 422,
    description: 'Dados inválidos (Validation Error).',
  })
  @ApiResponse({ status: 409, description: 'Morador já existe.' })
  async create(@Body() createResidentDto: CreateResidentInputDto) {
    console.log('createResidentDto', createResidentDto);
    return this.createResidentUseCase.execute(createResidentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os moradores do condominio' })
  @ApiResponse({ status: 200, description: 'Moradores encontrados' })
  async findAll() {
    return this.findAllResidentUseCase.execute();
  }

  @Get(':filter')
  @ApiOperation({
    summary:
      'Busca um morador especifico pelo o ID ou pelo o filtro ResidentFilter',
  })
  @ApiResponse({ status: 200, description: 'Morador encontrado' })
  @ApiResponse({ status: 404, description: 'Morador não encontrado' })
  async find(@Param('filter') filter: ResidentFilter) {
    return this.findResidentUseCase.execute(filter);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um morador' })
  @ApiResponse({ status: 200, description: 'Morador Atualizado' })
  @ApiResponse({ status: 404, description: 'Morador não encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateResidentInputDto) {
    return this.updateResidentUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Apaga um morador (soft delete)' })
  @ApiResponse({ status: 200, description: 'Morador apagado' })
  @ApiResponse({ status: 404, description: 'Morador não encontrado' })
  async delete(@Param('id') id: string) {
    return this.deleteResidentUseCase.execute(id);
  }
}
