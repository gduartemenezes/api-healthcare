import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { UpdateUserDto } from './dtos/update-user.dto';
  import { User } from './user.entity';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    // Endpoint para criar um novo usuário
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.create(createUserDto);
    }
  
    // Endpoint para obter todos os usuários
    @Get()
    async findAll(): Promise<User[]> {
      return await this.userService.findAll();
    }
  
    // Endpoint para obter um usuário específico por ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
      return await this.userService.findOne(id);
    }
  
    // Endpoint para atualizar um usuário por ID
    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return await this.userService.update(id, updateUserDto);
    }
  
    // Endpoint para remover um usuário por ID
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return await this.userService.remove(id);
    }
  }
  