import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { contentTypeMiddleware } from './middlewares/content-type.middleware';

async function bootstrap() {
  // Create a NestJS application instance
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Apply middlewares
  app.use(contentTypeMiddleware);

  // Configure and Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Transaction Management API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  // Start the application
  await app.listen(3000);
}
bootstrap();
