import { FastifyInstance } from "fastify";
import { healthRoutes } from "../modules/health/health.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { dashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { recommendationRoutes } from "../modules/recommendations/recommendations.routes";
import { benchmarkRoutes } from "../modules/benchmarks/benchmarks.routes";
import { tcoRoutes } from "../modules/tco/tco.routes";
import { renewalsRoutes } from "../modules/renewals/renewals.routes";
import { importsRoutes } from "../modules/imports/imports.routes";
import { workflowsRoutes } from "../modules/workflows/workflows.routes";
import { authMiddleware } from "../middleware/auth";
import { tenantMiddleware } from "../middleware/tenant";

export async function registerRoutes(app: FastifyInstance) {
  await healthRoutes(app);
  await authRoutes(app);

  app.register(async (protectedRoutes) => {
    protectedRoutes.addHook("preHandler", authMiddleware);
    protectedRoutes.addHook("preHandler", tenantMiddleware);

    await dashboardRoutes(protectedRoutes);
    await recommendationRoutes(protectedRoutes);
    await benchmarkRoutes(protectedRoutes);
    await tcoRoutes(protectedRoutes);
    await renewalsRoutes(protectedRoutes);
    await importsRoutes(protectedRoutes);
    await workflowsRoutes(protectedRoutes);
  });
}
