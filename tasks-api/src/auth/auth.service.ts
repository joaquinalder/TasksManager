import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async register({ email, password, name }: RegisterDto) {
    const passwordHash = await bcrypt.hash(password, 10);
    try {
      return await this.prisma.user.create({
        data: { email, password: passwordHash, name },
        select: { id: true, email: true, name: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }
}
