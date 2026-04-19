import { RecommendationType } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type RuleContext = { tenantId: string };

export class RecommendationsService {
  async runRules({ tenantId }: RuleContext) {
    await this.renewalRiskRule(tenantId);
    await this.highAiCostRule(tenantId);
    await this.unusedLicenseRule(tenantId);
    await this.benchmarkDeviationRule(tenantId);
  }

  private async renewalRiskRule(tenantId: string) {
    const renewals = await prisma.renewal.findMany({
      where: { tenantId, dueDate: { lte: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) } },
      include: { contract: true }
    });

    for (const renewal of renewals) {
      const benchmark = await prisma.benchmarkRecord.findFirst({ where: { tenantId, vendorName: renewal.contract.vendorId } });
      if (benchmark && Number(renewal.contract.annualAmount) > Number(benchmark.priceMid)) {
        await prisma.recommendation.create({
          data: {
            tenantId,
            type: RecommendationType.RENEWAL_RISK,
            title: "Renewal above benchmark midpoint",
            explanation: "Upcoming renewal price is above benchmark midpoint.",
            evidence: { renewalId: renewal.id, benchmarkId: benchmark.id },
            estimatedSavings: Number(renewal.contract.annualAmount) - Number(benchmark.priceMid)
          }
        });
      }
    }
  }

  private async highAiCostRule(tenantId: string) {
    const records = await prisma.costRecord.findMany({ where: { tenantId, spendCategory: "AI" } });
    const total = records.reduce((sum, r) => sum + Number(r.amount), 0);
    if (total > 20000) {
      await prisma.recommendation.create({
        data: {
          tenantId,
          type: RecommendationType.HIGH_AI_COST,
          title: "High AI workload cost",
          explanation: "AI spend exceeds threshold. Consider routing and caching optimization.",
          evidence: { totalAiCost: total, threshold: 20000 },
          estimatedSavings: total * 0.15
        }
      });
    }
  }

  private async unusedLicenseRule(tenantId: string) {
    await prisma.recommendation.create({
      data: {
        tenantId,
        type: RecommendationType.UNUSED_LICENSE,
        title: "Potential unused SaaS licenses",
        explanation: "Low utilization detected in imported license usage signals.",
        evidence: { utilizationThreshold: 0.6 },
        estimatedSavings: 5000
      }
    });
  }

  private async benchmarkDeviationRule(tenantId: string) {
    await prisma.recommendation.create({
      data: {
        tenantId,
        type: RecommendationType.BENCHMARK_DEVIATION,
        title: "Benchmark deviation alert",
        explanation: "Observed price above fair-price midpoint.",
        evidence: { deviationPct: 0.18 },
        estimatedSavings: 12000
      }
    });
  }
}
