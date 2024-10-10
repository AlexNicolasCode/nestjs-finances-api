import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { HealthzModule } from './healthz/healthz.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        HealthzModule,
    ],
})
export class AppModule {}
