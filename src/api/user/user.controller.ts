import {
  Controller,
  Get,
  UseGuards,
  Request
} from '@nestjs/common';
import {
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('getDangerousHours')
  getDangerousHours() {
    return this._userService.getDangerousHours();
  }
}
