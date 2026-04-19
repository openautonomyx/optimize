import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  API_PORT: z.coerce.number().default(4000),
  WEB_PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(10),
  DEFAULT_TENANT_SLUG: z.string().default("demo")
});

export type AppEnv = z.infer<typeof envSchema>;

export const env: AppEnv = envSchema.parse(process.env);
