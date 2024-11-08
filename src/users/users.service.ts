import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll(paginationParams: {
    page?: number;
    limit?: number;}) {
    const { page = 1, limit = 5 } = paginationParams;
    return this.userRepository.getAllUsers(page, limit);
  }

  findOne(id: string) {
    return this.userRepository.finById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }
}
