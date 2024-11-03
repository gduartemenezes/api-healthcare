import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id); // Check if user exists
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id); // Return updated user
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); // Check if user exists
    await this.userRepository.remove(user);
  }

  async findByEmailOrUserName(emailOrUsername: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        { email: emailOrUsername },
        { username: emailOrUsername },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { emailOrUsername, password } = credentialsDto;
    const user = await this.findByEmailOrUserName(emailOrUsername)

    if (user && (await user.checkPassword(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
