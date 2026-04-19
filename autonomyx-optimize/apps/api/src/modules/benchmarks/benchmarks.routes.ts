import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function benchmarkRoutes(app: FastifyInstance) {
  app.get("/benchmarks", async (request) => {
    const tenantId = request.auth!.tenantId;
    return prisma.benchmarkRecord.findMany({ where: { tenantId } });
  });
}
