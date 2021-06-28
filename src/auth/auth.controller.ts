import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  LoginUserDto,
  RegisterUserDto,
} from 'src/models/dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this._authService.validateUser(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this._authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  getProfile(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this._authService.changePassword(changePasswordDto, req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('resetPassword')
  resetPassword(@Request() req) {
    return this._authService.newRandomPassword(req.user.email);
  }
}
