import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger } from './middleware/logger/logger.middleware';
import { ExcludePasswordInterceptor } from './common/interceptors/exclude-password/exclude-password.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalLogger);
  app.useGlobalInterceptors(new ExcludePasswordInterceptor);
  await app.listen(3000);
}
bootstrap();
