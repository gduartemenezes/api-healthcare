import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'super-secret',
    signOptions: {
      expiresIn: 18000,
    },
  }),], // Importa a entidade User para o TypeORM],
 
  controllers: [AuthController],               // Registra o UserController
  providers: [UserService, AuthService],                    // Registra o UserService
})
export class AuthModule {}
