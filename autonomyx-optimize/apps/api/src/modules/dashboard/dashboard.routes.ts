import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function dashboardRoutes(app: FastifyInstance) {
  app.get("/dashboard/summary", async (request) => {
    const tenantId = request.auth!.tenantId;

    const [totalSpend, recs, renewalsDue] = await Promise.all([
      prisma.costRecord.aggregate({ where: { tenantId }, _sum: { amount: true } }),
      prisma.recommendation.count({ where: { tenantId } }),
      prisma.renewal.count({ where: { tenantId, dueDate: { lte: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90) } } })
    ]);

    return {
      totalSpend: totalSpend._sum.amount ?? 0,
      recommendations: recs,
      renewalsDue,
      identifiedSavings: 0,
      realizedSavings: 0
    };
  });
}
