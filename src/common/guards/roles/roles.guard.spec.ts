import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(() => {
    rolesGuard = new RolesGuard(mockReflector as any);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  it('should throw UnauthorizedException if user does not have required role', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { administrador: ['user'] } }),
      }),
      getHandler: jest.fn(), 
      getClass: jest.fn(),
    } as any;

    mockReflector.getAllAndOverride.mockReturnValue(['admin']);

    expect(() => rolesGuard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should return true if user has required role', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { administrador: ['admin'] } }),
      }),
      getHandler: jest.fn(),  // Simula el método getHandler
      getClass: jest.fn(),
    } as any;

    mockReflector.getAllAndOverride.mockReturnValue(['admin']);

    expect(rolesGuard.canActivate(context)).toBe(true);
  });
  
  });

