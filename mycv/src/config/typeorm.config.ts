import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  isTrueSet(value: string) {
    return (value.toLowerCase() === 'true');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    let dbConfig = {} as TypeOrmModuleOptions;
    switch (process.env.NODE_ENV) {
      case 'development':
        Object.assign(dbConfig, {
          type: this.configService.get<string>('DB_TYPE'),
          synchronize: this.isTrueSet(this.configService.get<string>('DB_SYNCHRONIZE')),
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: this.isTrueSet(this.configService.get<string>('DB_AUTOLOAD_ENTITIES')),
        });
        break;
      case 'test':
        Object.assign(dbConfig, {
          type: this.configService.get<string>('DB_TYPE'),
          synchronize: this.isTrueSet(this.configService.get<string>('DB_SYNCHRONIZE')),
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: this.isTrueSet(this.configService.get<string>('DB_AUTOLOAD_ENTITIES')),
          migrationsRun: this.isTrueSet(this.configService.get<string>('DB_MIGRATIONS_RUN')),
          entities: ['**/*.entity.ts'],
          migrations: ['src/migrations/*{.js,.ts}'],
        });
        break;
      case 'production':
        Object.assign(dbConfig, {
          type: this.configService.get<string>('DB_TYPE'),
          synchronize: this.isTrueSet(this.configService.get<string>('DB_SYNCHRONIZE')),
          username: this.configService.get<string>('DB_USERNAME'),
          password: this.configService.get<string>('DB_PASSWORD'),
          autoLoadEntities: this.isTrueSet(this.configService.get<string>('DB_AUTOLOAD_ENTITIES')),
          url: this.configService.get<string>('DB_URL'),
          migrationsRun: this.isTrueSet(this.configService.get<string>('DB_MIGRATIONS_RUN')),
          entities: ['**/*.entity.js'],
          migrations: ['dist/migrations/*{.js,.ts}'],
          ssl: this.isTrueSet(this.configService.get<string>('DB_SSL')),
        });
        break;
      default:
        throw new Error('unknown environment');
    }
    console.log(dbConfig);
    return dbConfig;
  }
}
