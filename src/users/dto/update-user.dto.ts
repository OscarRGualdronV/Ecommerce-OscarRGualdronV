import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}





