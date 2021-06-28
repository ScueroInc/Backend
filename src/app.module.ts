import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City, Comment, Country, District, GeneralData, Incidence, Person, User } from './models/entities';
import { IncidenceModule } from './api/incidence/incidence.module';
import { MailModule } from './mail/mail.module';
import * as cors from 'cors';
import * as morgan from 'morgan';
@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tdp_db',
      entities: [Country, City, Person, User, GeneralData, Comment, Incidence, District],
      synchronize: true,
    }),
    IncidenceModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), morgan('tiny'))
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
