import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //transform: true,
      //transformOptions: {
      //  enableImplicitConversion: true
      //}
    })
  );


  const config = new DocumentBuilder()
  .setTitle('Teslo RESTFul API')
  .setDescription('Teslo Shop Endpoints')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const documentFactory = () => SwaggerModule.createDocument(
    app, config
  );
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT);
}
bootstrap();
