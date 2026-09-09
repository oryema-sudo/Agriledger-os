import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN', 'http://localhost:3000').split(','),
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  const port = config.get<number>('PORT', 3000);
  await app.listen(port);

  logger.log(`AgriLedger API running on http://localhost:${port}/api/v1`);
  logger.log(`Environment: ${config.get('NODE_ENV', 'development')}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start AgriLedger', err);
  process.exit(1);
});
