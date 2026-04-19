import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { RecommendationsService } from "./recommendations.service";

const service = new RecommendationsService();

export async function recommendationRoutes(app: FastifyInstance) {
  app.get("/recommendations", async (request) => {
    return prisma.recommendation.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { createdAt: "desc" } });
  });

  app.post("/recommendations/run", async (request) => {
    await service.runRules({ tenantId: request.auth!.tenantId });
    return { status: "queued" };
  });
}
