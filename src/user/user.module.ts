import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importa a entidade User para o TypeORM
  controllers: [UserController],               // Registra o UserController
  providers: [UserService],                    // Registra o UserService
})
export class UserModule {}
