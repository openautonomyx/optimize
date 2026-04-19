import { Job } from "bullmq";
import { prisma } from "@autonomyx/db/src/client";

export async function runRecommendationJob(job: Job<{ tenantId: string }>) {
  // TODO: move to shared recommendation engine package.
  await prisma.recommendation.create({
    data: {
      tenantId: job.data.tenantId,
      type: "CLOUD_IDLE",
      title: "Cloud idle resource placeholder",
      explanation: "Background analyzer detected potential underutilized resources.",
      evidence: { source: "worker-placeholder" },
      estimatedSavings: 3000
    }
  });
}
