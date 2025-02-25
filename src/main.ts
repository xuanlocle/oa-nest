import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Location API')
    .setDescription('API for managing hierarchical locations')
    .setVersion('1.0')
    .addTag('locations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI available at /api
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
