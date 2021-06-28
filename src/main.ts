import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { ValidationClass } from './auth/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '120mb' }));
  app.use(bodyParser.urlencoded({ limit: '120mb', extended: true }));
  app.use(helmet());
  app.useGlobalPipes(new ValidationClass());

  const config = new DocumentBuilder()
    .setTitle('Authentication Document')
    .setDescription('Api for Authentication Controller')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const server = await app.listen(3000);
}
bootstrap();
