import { IsDate, IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { Status } from '../appointment.entity';

export class CreateAppointmentDto {
  @IsNotEmpty()
  patientId: string; // ID do paciente associado ao agendamento

  @IsDate()
  schedule: Date;

  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsString()
  primaryPhysician: string;

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