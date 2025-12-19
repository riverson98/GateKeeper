import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilterError } from './shared/infrastructure/filters/exception.filter-error';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilterError());

  const config = new DocumentBuilder()
    .setTitle('Gatekeeper API')
    .setDescription('API de controle de codigos de entregas para condomínios')
    .setVersion('1.0')
    .addTag('residents', 'Operações relacionadas aos moradores')
    .addTag('users', 'Operações relacionadas aos administradores do sistema')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
