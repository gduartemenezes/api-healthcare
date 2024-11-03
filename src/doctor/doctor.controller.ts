import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './doctor.entity';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // Cria um novo Doctor
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.create(createDoctorDto);
  }

  // Retorna todos os Doctors
  @Get()
  async findAll(): Promise<Doctor[]> {
    return await this.doctorService.findAll();
  }

  // Busca um Doctor pelo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Doctor> {
    return await this.doctorService.findOne(id);
  }

  // Atualiza um Doctor pelo ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return await this.doctorService.update(id, updateDoctorDto);
  }

  // Remove um Doctor pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.doctorService.remove(id);
  }
}
