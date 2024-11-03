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
    IsOptional,
  } from 'class-validator';
  import { Appointment } from 'src/appointment/appointment.entity';
  
  @Entity()
  export class Doctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @IsString()
    firstName: string;
  
    @Column()
    @IsString()
    lastName: string;
  
    @Column()
    @IsString()
    specialty: string;
  
    @Column({ unique: true })
    @IsEmail()
    email: string;
  
    @Column()
    @IsPhoneNumber(null)
    phone: string;
  
    @Column({ unique: true })
    @IsString()
    crm: string; // Número de registro médico
  
    @Column()
    @IsDate()
    birthDate: Date;
  
    // Relação OneToMany com a entidade Appointment
    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];
  }