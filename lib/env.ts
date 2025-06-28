// Safe environment variables that work in both client and server contexts

// Define default values that are safe to use in both environments
const defaultEnv = {
  MYSQL_HOST: 'localhost',
  MYSQL_USER: 'root',
  MYSQL_PASSWORD: '',
  MYSQL_DATABASE: 'udaan_db',
};

// Create a safe env object that works in both server and client without Node.js dependencies
export const env = {
  MYSQL_HOST: typeof process !== 'undefined' && process.env.MYSQL_HOST ? process.env.MYSQL_HOST : defaultEnv.MYSQL_HOST,
  MYSQL_USER: typeof process !== 'undefined' && process.env.MYSQL_USER ? process.env.MYSQL_USER : defaultEnv.MYSQL_USER,
  MYSQL_PASSWORD: typeof process !== 'undefined' && process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : defaultEnv.MYSQL_PASSWORD,
  MYSQL_DATABASE: typeof process !== 'undefined' && process.env.MYSQL_DATABASE ? process.env.MYSQL_DATABASE : defaultEnv.MYSQL_DATABASE,
};

