import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = () => {
  return {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrations: [__dirname + "/../migration/*{.ts,.js}"],
    synchronize: process.env.DB_SYNCRONIZE != null ? process.env.DB_SYNCRONIZE === "true" ? true : false : true,
    autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES != null ? process.env.DB_AUTO_LOAD_ENTITIES === "true" ? true : false : true,
    autoSchemaSync: process.env.DB_AUTOSCHEMA_SYNC != null ? process.env.DB_AUTOSCHEMA_SYNC === "true" ? true : false : true,
    dropSchema:  process.env.DB_DROP_SCHEMA != null ? process.env.DB_DROP_SCHEMA === "true"? true : false : false,
    migrationsRun: process.env.DB_MIGRATION_RUN != null ? process.env.DB_MIGRATION_RUN === "true"? true : false : true,
    logging: process.env.DB_LOGGING != null ? process.env.DB_LOGGING === "true"? true : false : false,
    cli: {
      migrationsDir: __dirname + "./migration/*{.ts,.js}",
    },
  } as TypeOrmModuleOptions;
};
