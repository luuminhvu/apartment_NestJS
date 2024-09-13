import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useLogger(['error', 'warn', 'debug', 'log', 'verbose']);
  await app.listen(3000);
}
bootstrap();
