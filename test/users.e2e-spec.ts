import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { UsersService } from '../src/users/users.service';
import { Role } from '../src/users/enum/rol.enum';


describe ('UsersController (e2e)', () => {
    let app: INestApplication
    let userService: UsersService;
    let token: string;
    let userId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()

        const user = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password',
            phone: '1234567890',
            country: 'Country',
            address: 'Address',
            city: 'City',
            administrador: Role.ADMIN
    });

    userId = user.body.id

    const loginResponse = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({
            email: 'admin@example.com',
            password: 'password',
        });

    console.log("Login Token:", loginResponse.body);
    token = loginResponse.body.access_token;


    });

    afterAll(async () => {
        await app.close()
    })

})

