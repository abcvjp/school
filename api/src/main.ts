import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      enableDebugMessages:
        config.get('app.environment') === 'development' ? true : false,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // SWAGGER
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('School API')
      .setDescription('This is School API')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup('doc', app, document);

  const port = config.get('app.port');
  const environment = config.get('app.environment');
  await app.listen(port, () => {
    Logger.log(`Server is listening at http://localhost:${port}`);
    Logger.log(`Evironment: ${environment}`);
  });
}
bootstrap();
