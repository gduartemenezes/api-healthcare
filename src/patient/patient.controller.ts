import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { PatientService } from './patient.service';
  import { CreatePatientDto } from './dtos/create-patient.dto';
  import { UpdatePatientDto } from './dtos/update-patient.dto';
  import { Patient } from './patient.entity';
  
  @Controller('patients')
  export class PatientController {
    constructor(private readonly patientService: PatientService) {}
  
    // Endpoint para criar um novo paciente
    @Post()
    async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
      return await this.patientService.create(createPatientDto);
    }
  
    // Endpoint para obter todos os pacientes
    @Get()
    async findAll(): Promise<Patient[]> {
      return await this.patientService.findAll();
    }
  
    // Endpoint para obter um paciente específico por ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Patient> {
      return await this.patientService.findOne(id);
    }
  
    // Endpoint para atualizar um paciente por ID
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updatePatientDto: UpdatePatientDto,
    ): Promise<Patient> {
      return await this.patientService.update(id, updatePatientDto);
    }
  
    // Endpoint para remover um paciente por ID
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return await this.patientService.remove(id);
    }
  }
  