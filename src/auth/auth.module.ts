import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../api/user/user.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person, User } from 'src/models/entities';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Person])
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
