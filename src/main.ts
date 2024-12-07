import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/logger/logger.middleware';
import { ExcludePasswordInterceptor } from './common/interceptors/exclude-password/exclude-password.interceptor';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription(`
  API de E-Commerce para gestión de productos, usuarios y órdenes, 
  desarrollada con NestJS como parte del Bootcamp de Desarrollo Web Full Stack 
  de Henry, en la especialidad de Backend.

  Esta API permite realizar operaciones como:
  - Gestión de productos: Crear, leer, actualizar y eliminar productos.
  - Administración de usuarios: Registro, autenticación y actualización de datos de usuario.
  - Gestión de órdenes: Crear y visualizar.
  - Integración con Cloudinary para almacenar y gestionar imágenes de productos en la nube.

  Los endpoints están protegidos por un sistema de autenticación basado en JWT y roles de usuario (admin y usuario normal).
  
  La API está diseñada para ser fácil de usar, eficiente y segura, y sigue las mejores prácticas de desarrollo en el backend.
  Además, la integración con Cloudinary permite gestionar las imágenes de productos de manera eficiente y escalable, sin ocupar espacio en el servidor local.
`)
    .setVersion('1.0')
    .addBearerAuth()   
    .build();     
    
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}


bootstrap();
