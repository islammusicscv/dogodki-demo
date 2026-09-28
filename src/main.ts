import 'reflect-metadata';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // IN: every @Body(), @Query() and @Param() typed with a DTO class is validated
  // before it reaches a controller method.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // drop properties that are not in the DTO
    forbidNonWhitelisted: true, // ... and answer 400 if the client sent them
    transform: true, // plain JSON object -> instance of the DTO class
  }));

  // OUT: entities are serialized through class-transformer (@Expose, @Exclude).
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // ERRORS: every error response has the same shape (ErrorResponseDto).
  app.useGlobalFilters(new HttpExceptionFilter());

  // API documentation, generated from controllers and DTOs: http://localhost:3000/docs
  const config = new DocumentBuilder()
    .setTitle('Dogodki API')
    .setDescription('Demo aplikacija za predmet Razvoj spletnih rešitev')
    .setVersion('be-s3')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`Dogodki API: http://localhost:${port}  (docs: /docs)`);
}
bootstrap();
