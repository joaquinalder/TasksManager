import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};


@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'clave_secreta_super_segura_2026',
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, 
    { provide: PrismaService, useValue: mockPrisma },
    JwtStrategy
  ],
  exports: [AuthService], 
})
export class AuthModule {}