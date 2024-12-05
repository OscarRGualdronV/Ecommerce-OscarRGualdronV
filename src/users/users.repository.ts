import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}
    

    async getAllUsers(page: number = 1, limit: number = 5): Promise<{ data: User[]; page: number; limit: number; totalCount: number; totalPages: number }> {
        return this.paginate({ page, limit });
    }
    
    async finById(id: string) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async remove(id: string) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }
        return this.usersRepository.remove(user);
    }

    async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.usersRepository.findOneBy({ email } );
        if (!user) {
            throw new Error("User not found");
        }
        return user || undefined;

    }

    async create(CreateUserDto: CreateUserDto) {
        const newUser = this.usersRepository.create(CreateUserDto);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        await this.usersRepository.update(id, updateUserDto);
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async paginate({ page, limit }: { page: number; limit: number }){
        const [data, totalCount] = await this.usersRepository.findAndCount({
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