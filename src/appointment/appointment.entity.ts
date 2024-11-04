import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { IsDate, IsString, IsEnum, IsOptional } from 'class-validator';
  import { Patient } from '../patient/patient.entity';
  import { User } from 'src/user/user.entity';
import { Doctor } from 'src/doctor/doctor.entity';
  
  // Enum para o status do agendamento
  export enum Status {
    SCHEDULED = 'SCHEDULED',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    NO_SHOW = 'NO_SHOW',
  }
  
  @Entity()
  export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true })
    patient: Patient;
  
    @Column()
    @IsDate()
    schedule: Date;
  
    @Column({
      type: 'enum',
      enum: Status,
    })
    @IsEnum(Status)
    status: Status;
  
    @Column()
    @IsString()
    reason: string;
  
    @Column()
    @IsString()
    note: string;
  
    @ManyToOne(() => User, { eager: true })
    user: User;

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
    doctor: Doctor;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    cancellationReason: string | null;


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  }
  