import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { database } from '../../utils/constants/database';

@Module({
  imports: [
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
