import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { SharedModule } from 'src/shared/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
