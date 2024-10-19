import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  // Criação de um agendamento
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  // Obter todos os agendamentos
  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  // Obter um agendamento pelo ID
  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  // Atualizar um agendamento
  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id); // Verifica se o agendamento existe
    Object.assign(appointment, updateAppointmentDto); // Atualiza os campos com os novos valores
    return await this.appointmentRepository.save(appointment);
  }

  // Remover um agendamento
  async remove(id: string): Promise<void> {
    const appointment = await this.findOne(id); // Verifica se o agendamento existe
    await this.appointmentRepository.remove(appointment); // Remove o agendamento
  }
}
