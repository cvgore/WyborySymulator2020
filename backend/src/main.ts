import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Creates an application and runs it asynchronously
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
