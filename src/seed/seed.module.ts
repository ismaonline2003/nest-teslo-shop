import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule,
    AuthModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ ConfigModule],
      inject: [ ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
            secret: configService.get('JWT_SECRET'), 
            signOptions: {expiresIn: '2h'}
        }
      }
    })
  ]
})
export class SeedModule {}
