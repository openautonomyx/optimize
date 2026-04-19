import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function tcoRoutes(app: FastifyInstance) {
  app.get("/tco/scenarios", async (request) => {
    return prisma.tCOScenario.findMany({
      where: { tenantId: request.auth!.tenantId },
      include: { components: true }
    });
  });
}
