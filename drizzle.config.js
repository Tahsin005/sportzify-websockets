import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { envConfig } from './src/config/env';

if (!envConfig.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

export default defineConfig({
  schema: './src/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: envConfig.DATABASE_URL,
  },
});
