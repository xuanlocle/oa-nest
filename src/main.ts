import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLogger } from './common/logger.service';
import { HttpErrorFilter } from './common/exceptions/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = app.get(AppLogger);
  app.useGlobalFilters(new HttpErrorFilter(logger));

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
  logger.log(`🚀 Application is running on: http://${process.env.HOST ?? 'localhost'}:3000`);

}
bootstrap();
