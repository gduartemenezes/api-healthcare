import * as bcrypt from 'bcrypt'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import {
    IsString,
    IsEmail,
    IsDate,
    MinLength,
    IsOptional,
  } from 'class-validator';
  import { Appointment } from '../appointment/appointment.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @IsString()
    firstName: string;
  
    @Column()
    @IsString()
    lastName: string;
  
    @Column({ unique: true })
    @IsEmail()
    email: string;
  
    @Column()
    @IsDate()
    birthDate: Date;
  
    @Column({ unique: true })
    @IsString()
    username: string;
  
    @Column()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    phoneNumber?: string;
  
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    address?: string;
  
    // Relação OneToMany com a entidade Appointment
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashedPassword);
    }
  }