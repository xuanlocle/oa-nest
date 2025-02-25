import { Module, LoggerService, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './locations/entities/locations.entities';
import { ConfigModule } from '@nestjs/config';
import { AppLogger } from './common/logger.service';
import { RequestLoggerMiddleware } from './common/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT || '5432', 10),
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      entities: [Location],
      synchronize: true, // Auto-sync schema (disable in production)
    }),
    LocationsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppLogger],
  exports: [AppLogger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*'); // ✅ Logs every request
  }
}
