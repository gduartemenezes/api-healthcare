import * as bcrypt from 'bcrypt'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashedPassword);
    }
  }