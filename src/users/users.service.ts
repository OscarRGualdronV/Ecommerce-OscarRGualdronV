import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
) {}

async getAllUsers(
    page: number = 1, 
    limit: number = 5): Promise<{ data: User[]; page: number; limit: number; totalCount: number; totalPages: number }> {
    return this.paginate({ page, limit });
}

async finById(id: string): Promise<User> {
    try {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    } catch (error) {
        throw new HttpException(`Error finding user by id: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

async remove(id: string): Promise<User> {
    try {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        return await this.userRepository.remove(user);
        } catch (error) {
        throw new Error(`Error removing user: ${error}`);
    }
}

async findByEmail(email: string): Promise<User | undefined>{
    try {
        return await this.userRepository.findOneBy({ email });
    } catch (error) {
        throw new Error(`Error finding user by email: ${error}`);
    }
}

async create(CreateUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(CreateUserDto);
    await this.userRepository.save(newUser);
    return newUser;
}

async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

async paginate({ page, limit }: { 
    page: number; 
    limit: number }): Promise<{ data: User[]; page: number; limit: number; totalCount: number; totalPages: number }> {
    const [data, totalCount] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
    });

    return {
        data,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
    };
}
}
