import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  // Cria um novo registro de doctor
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = this.doctorRepository.create(createDoctorDto);
    return await this.doctorRepository.save(newDoctor);
  }

  // Retorna todos os doctors
  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  // Busca um doctor pelo ID
  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  // Atualiza um doctor pelo ID
  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);
    const updatedDoctor = this.doctorRepository.merge(doctor, updateDoctorDto);
    return await this.doctorRepository.save(updatedDoctor);
  }

  // Remove um doctor pelo ID
  async remove(id: string): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctorRepository.remove(doctor);
  }
}
