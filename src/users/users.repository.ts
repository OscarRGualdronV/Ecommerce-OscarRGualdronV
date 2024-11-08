import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository {
    private users = {
        data : [
            {
                id: 1,
                email: "john.doe@example.com",
                name: "John Doe",
                password: "password123",
                address: "123 Maple Street",
                phone: "555-1234",
                country: "USA",
                city: "New York",
            },
            {
                id: 2,
                email: "jane.smith@example.com",
                name: "Jane Smith",
                password: "securepass456",
                address: "456 Oak Avenue",
                phone: "555-5678",
                country: "Canada",
                city: "Toronto",
            },
            {
                id: 3,
                email: "robert.brown@example.com",
                name: "Robert Brown",
                password: "qwerty789",
                address: "789 Pine Road",
                phone: "555-9012",
                country: "UK",
                city: "London",
            },
            {
                id: 4,
                email: "lisa.jones@example.com",
                name: "Lisa Jones",
                password: "mypassword321",
                address: "101 Elm Boulevard",
                phone: "555-3456",
                country: "Australia",
                city: "Sydney",
            },
            {
                id: 5,
                email: "michael.johnson@example.com",
                name: "Michael Johnson",
                password: "letmein123",
                address: "202 Cedar Lane",
                phone: "555-7890",
                country: "Germany",
                city: "Berlin",
            }
        ]
    };

    async getAllUsers(page: number = 1, limit: number= 5) {
        return this.paginate({page, limit});
    }

    async finById(id: number) {
        const user = await this.users.data.find((user) => user.id === id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async remove(id: number) {
        const user = await this.finById(id);
        this.users.data = this.users.data.filter((user) => user.id !== id);
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.users.data.find((user) => user.email === email);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async create(CreateUserDto: CreateUserDto) {
        const newUser = {
            id: this.users.data.length + 1,
            ...CreateUserDto,
        };
        this.users.data.push(newUser);
        return newUser;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.finById(id);
        const updatedUser = {
            ...user,
            ...updateUserDto,
        };
        this.users.data = this.users.data.map((user) => {
            if (user.id === id) {
                return updatedUser;
            }
            return user;
        });
        return updatedUser;
    }

    paginate({page, limit}: {page: number, limit: number}) {
        const offset = (page - 1) * limit;
        const paginatedUsers = this.users.data.slice(offset, offset + limit);
        return{
            data: paginatedUsers,
            page,
            limit,
            totalCount: this.users.data.length,
            totalPages: Math.ceil(this.users.data.length / limit),
        };
    }
    
    }       