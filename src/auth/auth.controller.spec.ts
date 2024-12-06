import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { v4 as uuidv4 } from 'uuid';


const mockUserId = uuidv4();

const authServiceMock = {
  signIn: jest.fn(),
  signUp: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should call signIn method of AuthService', async () => {
      const signInDto: SigninDto = { email: 'test@test.com', password: 'password' }; 
      const result = { token: 'some-token' }; 

      authServiceMock.signIn.mockResolvedValue(result);

      const response = await controller.signIn(signInDto);
      expect(response).toEqual(result);
      expect(authServiceMock.signIn).toHaveBeenCalledWith(signInDto);
    });
  });

  describe('signUp', () => {
    it('should call signUp method of AuthService and return the user', async () => {
      const signUpDto: SignupDto = { 
        name: 'Test', 
        email: 'test@test.com', 
        password: 'password',
        passwordConfirm: 'password',
        address: 'Address',
        phone: 123456789,
        country: 'Country',
        city: 'City',
        createdAt: '2023-07-23T12:34:56.789Z',
      }; 
      const createdUser = { id: '1', name: 'Test', email: 'test@test.com' }; 

      authServiceMock.signUp.mockResolvedValue(createdUser);

      const response = await controller.signUp(signUpDto);
      expect(response).toEqual({
        message: 'User created successfully',
        user: createdUser,
      });
      expect(authServiceMock.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

});
