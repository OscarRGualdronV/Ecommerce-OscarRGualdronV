import { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$', 
    transform: {
    '^.+\\.ts$': 'ts-jest', 
},
    collectCoverageFrom: ['**/*.(t|j)s'], 
    coverageDirectory: './coverage', 
    testEnvironment: 'node', 
    moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', 
    '^tests/(.*)$': '<rootDir>/tests/$1',
},
    globals: {
    'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.json', 
        
    },
},
};

export default config;
