import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig} from './config/data.source';
import { OrdersModule } from './orders/orders.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { SharedModule } from './shared/shared/shared.module';
import { console } from 'inspector';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresDataSourceConfig, () => ({
        environment: process.env.environment || 'TEST'
      })],
      envFilePath: ['.env.development', '.env.test']
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService ) => {
        try{        const environment = configService.get('environment') 

          const dbConfig = environment === 'TEST'
              ? configService.get('postgres')
              : configService.get('postgres');
  
          console.log('Database config:', dbConfig);    
          return dbConfig;
        }catch (error){
            console.log('Error al obtener la configuración de la base de datos:', error);
            throw error;
          }
      }
    }),
    UsersModule, ProductsModule, AuthModule, OrdersModule, CategoryModule, FileUploadModule, SharedModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware)
    // .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
