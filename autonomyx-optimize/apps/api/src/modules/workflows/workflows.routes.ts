import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function workflowsRoutes(app: FastifyInstance) {
  app.get("/workflows", async (request) => {
    return prisma.workflow.findMany({
      where: { tenantId: request.auth!.tenantId },
      include: { tasks: true }
    });
  });
}
