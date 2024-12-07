import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { Role } from '../src/users/enum/rol.enum';


describe ('UsersController (e2e)', () => {
    let app: INestApplication;
    let token: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /auth/signup', () => {
        it('should create a new user and return success message', async () => {
            const signUpDto = {
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password',
            phone: '1234567890',
            country: 'Country',
            address: 'Address',
            city: 'City',
            administrador: Role.ADMIN,
        };
    
            const response = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(signUpDto)
            .expect(201);
    
            expect(response.body.message).toBe('User created successfully');
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user.name).toBe('Admin User');
            expect(response.body.user.email).toBe('admin@example.com');
        });
    });

})

