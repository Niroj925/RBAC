import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist:true
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(4040);
}

bootstrap().then(()=>{
  console.log('server is running');
});
