import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsDate,
    IsEnum,
    IsOptional,
    IsBoolean,
  } from 'class-validator';
import { Appointment } from 'src/appointment/appointment.entity';
  
  // Enum para gênero
  export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
  }
  
  // Entidade Patient
  @Entity()
  export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @IsString()
    name: string;
  
    @Column({ unique: true })
    @IsEmail()
    email: string;
  
    @Column()
    @IsPhoneNumber(null)
    phone: string;
  
    @Column()
    @IsDate()
    birthDate: Date;
  
    @Column({
      type: 'enum',
      enum: Gender,
    })
    @IsEnum(Gender)
    gender: Gender;
  
    @Column()
    @IsString()
    address: string;
  
    @Column()
    @IsString()
    occupation: string;
  
    @Column()
    @IsString()
    emergencyContactName: string;
  
    @Column()
    @IsPhoneNumber(null)
    emergencyContactNumber: string;
  
    // @Column()
    // @IsString()
    // primaryPhysician: string;
  
    @Column()
    @IsString()
    insuranceProvider: string;
  
    @Column()
    @IsString()
    insurancePolicyNumber: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    allergies?: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    currentMedication?: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    familyMedicalHistory?: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    pastMedicalHistory?: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    identificationType?: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    identificationNumber?: string;
  
    @Column({ type: 'bytea', nullable: true })
    @IsOptional()
    identificationDocument?: Blob;
  
    @Column()
    @IsBoolean()
    privacyConsent: boolean;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment;
  }