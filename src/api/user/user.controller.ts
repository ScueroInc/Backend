import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private _userService: UserService) { }

  @Get('getUserInformation')
  async getProfile() {
    return this._userService.getUserInformation();
  }
}
