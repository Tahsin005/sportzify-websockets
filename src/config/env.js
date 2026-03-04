import 'dotenv/config';

export const envConfig = {
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  HOST: process.env.HOST,
  DATABASE_URL: process.env.DATABASE_URL,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
  API_URL: process.env.API_URL,
  BROADCAST: process.env.BROADCAST,
  DELAY_MS: process.env.DELAY_MS,
  MATCH_COUNT: process.env.MATCH_COUNT,
  SEED_MATCH_DURATION_MINUTES: process.env.SEED_MATCH_DURATION_MINUTES || "120",
  SEED_FORCE_LIVE: process.env.SEED_FORCE_LIVE !== "0" && process.env.SEED_FORCE_LIVE !== "false"
};