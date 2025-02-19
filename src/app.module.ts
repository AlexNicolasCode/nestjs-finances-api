import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthzModule } from './modules/healthz/healthz.module';
import { AuthModule } from './modules/auth';
import { TransactionModule } from './modules/transactions';
import { BalancesModule } from './modules/balances';

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
        BalancesModule,
    ],
})
export class AppModule {}
