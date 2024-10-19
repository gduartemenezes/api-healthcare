import {
    IsString,
    IsEmail,
    IsDate,
    MinLength,
    IsOptional,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsDate()
    birthDate: Date;
  
    @IsString()
    username: string;
  
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
  
    @IsOptional()
    @IsString()
    phoneNumber?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  }
  