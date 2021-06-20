import * as fs from 'fs';
import * as dotenv from 'dotenv';

const DEV_ENV = "dev";
const PROD_ENV = "prod";

const envFile = fs.readFileSync(`env/.env.${DEV_ENV}`);
const ENV = dotenv.parse(envFile);

export const database = {
  connection: `${ENV.URL_CONNECTION}${ENV.DATABASE_NAME}${ENV.CONNECTION_OPTIONS}`,
  schema: {

  },
};
