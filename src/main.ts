import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/logger/logger.middleware';
import { ExcludePasswordInterceptor } from './common/interceptors/exclude-password/exclude-password.interceptor';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalLogger);
  app.useGlobalInterceptors(new ExcludePasswordInterceptor);

  const categoriesSeed = app.get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log('La inserción de categorías ha finalizado');

  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();
  console.log('La inserción de productos ha finalizado');

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  
  await app.listen(3000);
}
bootstrap();
