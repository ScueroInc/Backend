import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  RegisterUserDto,
} from 'src/models/dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this._authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this._authService.register(registerDto);
  }
}
