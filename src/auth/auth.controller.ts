import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    UseGuards,
    Patch,
    Param,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { CredentialsDto } from './dto/credentials.dto';
  import { AuthGuard } from '@nestjs/passport';
  import { User } from '../user/user.entity';  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signin')
    async signIn(
      @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    ): Promise<{ token: string }> {
      return await this.authService.signIn(credentiaslsDto);
    }
  
    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(): User {
      return null;
    }
  }