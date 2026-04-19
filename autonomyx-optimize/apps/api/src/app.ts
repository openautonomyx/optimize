import Fastify from "fastify";
import sensible from "@fastify/sensible";
import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./lib/logger";

export async function buildApp() {
  const app = Fastify({ logger });
  await app.register(sensible);
  app.setErrorHandler(errorHandler);
  await registerRoutes(app);
  return app;
}
