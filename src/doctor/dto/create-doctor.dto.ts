import { IsString, IsEmail, IsPhoneNumber, IsDate } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  specialty: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phone: string;

  @IsString()
  crm: string; // Número de registro médico

  @IsDate()
  birthDate: Date;
}