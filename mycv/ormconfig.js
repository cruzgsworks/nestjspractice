const typeorm = require("typeorm")

const dbConfig = {
  synchronize: false,
  migrations: [__dirname + '/src/migrations/*.js'],
};

const dbUrl = process.env.DATABASE_URL || "";

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
      KeepConnectionAlive: true
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: dbUrl,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false
      }
    });
    break;
  default:
    throw new Error('unknown environment');
}

const dtSource = new typeorm.DataSource(dbConfig);

console.log(dbConfig);

module.exports = {dbConfig, dtSource};
