const VARIABLES = {
  db_dialect: process.env.DB_DIALECT || 'postgres',
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || '5432',
  db_name: process.env.DB_NAME || 'testdb',
  db_user: process.env.DB_USER || 'postgres',
  db_password: process.env.DB_PASSWORD || 'Tomy0306',
};

module.exports = VARIABLES;
