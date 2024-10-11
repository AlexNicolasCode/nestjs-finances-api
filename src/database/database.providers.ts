import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [
          __dirname + '/entities/*{.ts,.js}',
        ],
        migrations: [
          __dirname + '/migrations/*{.ts,.js}',
        ],
      });
      const dataSourceInstance = await dataSource.initialize();
      await dataSourceInstance.runMigrations();
      return dataSourceInstance;
    },
  },
];