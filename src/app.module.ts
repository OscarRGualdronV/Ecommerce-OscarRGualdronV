import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data.source';
import { OrdersModule } from './orders/orders.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService ) =>
        configService.get('postgres'),  
    }),
    UsersModule, ProductsModule, AuthModule, OrdersModule, CategoryModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware)
    // .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
