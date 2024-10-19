import { IsString, IsEmail, IsPhoneNumber, IsDate, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Gender } from '../patient.entity';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phone: string;

  @IsDate()
  birthDate: Date;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  address: string;

  @IsString()
  occupation: string;

  @IsString()
  emergencyContactName: string;

  @IsPhoneNumber(null)
  emergencyContactNumber: string;

  @IsString()
  primaryPhysician: string;

  @IsString()
  insuranceProvider: string;

  @IsString()
  insurancePolicyNumber: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  currentMedication?: string;

  @IsOptional()
  @IsString()
  familyMedicalHistory?: string;

  @IsOptional()
  @IsString()
  pastMedicalHistory?: string;

  @IsOptional()
  @IsString()
  identificationType?: string;

  @IsOptional()
  @IsString()
  identificationNumber?: string;

  // Ajuste o tipo para Buffer
  @IsOptional()
  identificationDocument?: Buffer;

  @IsBoolean()
  privacyConsent: boolean;
}
