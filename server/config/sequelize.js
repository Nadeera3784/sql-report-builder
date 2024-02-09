
module.exports = {
    development: {
      username: process.env.DB_MYSQL_USERNAME || 'root',
      password: process.env.DB_MYSQL_PASSWORD || '',
      database: process.env.DB_MYSQL_DATABASE || 'o2odata',
      host: process.env.DB_MYSQL_HOST || '127.0.0.1',
      port: process.env.DB_MYSQL_PORT || 3306,
      dialect: 'mysql',
      dialectOptions: { decimalNumbers: true },
      logging: true
    },
    test: {
      username: process.env.DB_MYSQL_USERNAME || 'root',
      password: process.env.DB_MYSQL_PASSWORD || '',
      database: process.env.DB_MYSQL_DATABASE || 'o2odata',
      host: process.env.DB_MYSQL_HOST || '127.0.0.1',
      port: process.env.DB_MYSQL_PORT || 3306,
      dialect: 'mysql',
      dialectOptions: { decimalNumbers: true },
      logging: true
    },
    production: {
      username: process.env.DB_MYSQL_USERNAME || 'root',
      password: process.env.DB_MYSQL_PASSWORD || '',
      database: process.env.DB_MYSQL_DATABASE || 'o2odata',
      host: process.env.DB_MYSQL_HOST || '127.0.0.1',
      port: process.env.DB_MYSQL_PORT || 3306,
      dialect: 'mysql',
      dialectOptions: { decimalNumbers: true },
      logging: true
    }
  };
  