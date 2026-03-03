import 'dotenv/config';

export const envConfig = {
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  DATABASE_URL: process.env.DATABASE_URL,
};