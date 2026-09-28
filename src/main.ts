import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Every @Body(), @Query() and @Param() typed with a DTO class is validated
  // before it reaches a controller method.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // drop properties that are not in the DTO
      forbidNonWhitelisted: true, // ... and answer 400 if the client sent them
      transform: true, // plain JSON object -> instance of the DTO class
    }),
  );

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`Dogodki API: http://localhost:${port}`);
}
bootstrap();
