import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envs } from "./envs";

export const db: TypeOrmModuleOptions = {
    type: 'mysql',
    host: envs.host,
    username: envs.user,
    password: envs.pass,
    database: envs.database,
    entities: [],
    autoLoadEntities: true, //carga las entidades que hayan
    synchronize: true, //realiza las migraciones de las tablas existentes
}