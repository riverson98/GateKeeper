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
  async create(@Body() createResidentDto: CreateResidentInputDto) {
    console.log('createResidentDto', createResidentDto);
    return this.createResidentUseCase.execute(createResidentDto);
  }

  @Get()
  async findAll() {
    return this.findAllResidentUseCase.execute();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.findResidentUseCase.execute({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateResidentInputDto) {
    return this.updateResidentUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteResidentUseCase.execute(id);
  }
}
