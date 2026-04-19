import { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ status: "ok", service: "api" }));
  app.get("/ready", async () => ({ ready: true }));
}
