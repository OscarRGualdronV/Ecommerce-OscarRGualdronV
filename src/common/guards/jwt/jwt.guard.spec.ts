import { JwtGuard } from './jwt.guard';

const mockJwtService = {
  verifyAsync: jest.fn(),
};

const mockConfigService = {
  get: jest.fn().mockReturnValue('secretKey'),
};

describe('JwtGuard', () => {
  let jwtGuard: JwtGuard;

  beforeEach(() => {
    jwtGuard = new JwtGuard(mockJwtService as any, mockConfigService as any);
  });

  it('should be defined', () => {
    expect(jwtGuard).toBeDefined();
  });
});
