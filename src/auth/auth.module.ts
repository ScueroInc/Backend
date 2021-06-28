import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../api/user/user.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person, User } from 'src/models/entities';
import { JwtStrategy } from './jwt.strategy';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Person]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [AuthService, JwtStrategy, MailService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
