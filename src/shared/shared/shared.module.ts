import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService: ConfigService) => {
                const secret = configService.get('JWT_SECRET');
                if(!secret){
                    throw new Error('failed to configure JWT service');
                }
                return {
                    secret,
                    signOptions: {expiresIn: '60m'}
                }
            }
        }),
    ],
    exports: [JwtModule]
})
export class SharedModule {}
