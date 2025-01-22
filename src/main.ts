import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Налаштування конфігурації Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  // Створення документа Swagger
  const document = SwaggerModule.createDocument(app, config);

  // Налаштування маршруту документації Swagger
  SwaggerModule.setup('docs', app, document);

  // Запуск сервера
  await app.listen(3001);
}
bootstrap();
