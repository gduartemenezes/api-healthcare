import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userService.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }
}
