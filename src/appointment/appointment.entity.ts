import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { IsDate, IsString, IsEnum, IsOptional } from 'class-validator';
  import { Patient } from '../patient/patient.entity';
  import { User } from 'src/user/user.entity';
  
  // Enum para o status do agendamento
  export enum Status {
    SCHEDULED = 'scheduled',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
    NO_SHOW = 'no_show',
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
    primaryPhysician: string;
  
    @Column()
    @IsString()
    reason: string;
  
    @Column()
    @IsString()
    note: string;
  
    @ManyToOne(() => User, { eager: true })
    user: User;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    cancellationReason: string | null;
  }
  