import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthzModule } from './healthz/healthz.module';
import { AuthModule } from './auth';
import { TransactionModule } from './transactions';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [
              __dirname + '/database/entities/*{.ts,.js}',
            ],
            migrations: [
              __dirname + '/database/migrations/*{.ts,.js}',
            ],
            migrationsRun: true,
        }),
        HealthzModule,
        AuthModule,
        TransactionModule,
    ],
})
export class AppModule {}
