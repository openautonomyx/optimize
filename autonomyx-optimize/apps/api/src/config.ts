import { env } from "@autonomyx/config";

export const config = {
  port: env.API_PORT,
  jwtSecret: env.JWT_SECRET,
  redisUrl: env.REDIS_URL
};
