import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Creamos un pool de conexiones nativo de Postgres
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // Creamos el adaptador para Prisma 7
    const adapter = new PrismaPg(pool);

    // Pasamos el adaptador a la clase padre
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Base de Datos conectada con Prisma 7 Adapter');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}