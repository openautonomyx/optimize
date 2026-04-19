import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function renewalsRoutes(app: FastifyInstance) {
  app.get("/renewals", async (request) => {
    return prisma.renewal.findMany({
      where: { tenantId: request.auth!.tenantId },
      include: { contract: { include: { vendor: true } } },
      orderBy: { dueDate: "asc" }
    });
  });
}
