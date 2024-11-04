import { IsDate, IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { Status } from '../appointment.entity';
import { Doctor } from 'src/doctor/doctor.entity';
import { Patient } from 'src/patient/patient.entity';
import { DeepPartial } from 'typeorm';

export class CreateAppointmentDto {
  @IsNotEmpty()
  patient: DeepPartial<Patient>; // ID do paciente associado ao agendamento

  @IsDate()
  schedule: Date;

  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsNotEmpty()
  doctor: DeepPartial<Doctor>;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  userId: string; // ID do usuário associado ao agendamento

  @IsOptional()
  @IsString()
  cancellationReason?: string | null; // Cancelamento opcional
}