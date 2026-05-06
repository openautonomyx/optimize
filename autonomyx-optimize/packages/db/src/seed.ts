import bcrypt from "bcryptjs";
import {
  ContractStatus,
  PrismaClient,
  RecommendationStatus,
  RecommendationType,
  RenewalStatus,
  SpendCategory,
  WorkflowStatus
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "demo" },
    update: {},
    create: { name: "Demo Corp", slug: "demo" }
  });

  const adminRole = await prisma.role.upsert({
    where: { tenantId_name: { tenantId: tenant.id, name: "admin" } },
    update: {},
    create: { tenantId: tenant.id, name: "admin" }
  });

  const passwordHash = await bcrypt.hash("password123", 12);
  const adminUser = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: "admin@demo.local" } },
    update: { passwordHash, isActive: true },
    create: {
      tenantId: tenant.id,
      email: "admin@demo.local",
      name: "Demo Admin",
      passwordHash,
      isActive: true
    }
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
    update: {},
    create: { userId: adminUser.id, roleId: adminRole.id }
  });

  const [aws, slack, openai] = await Promise.all([
    prisma.vendor.create({ data: { tenantId: tenant.id, name: "AWS", category: SpendCategory.CLOUD } }),
    prisma.vendor.create({ data: { tenantId: tenant.id, name: "Slack", category: SpendCategory.SAAS } }),
    prisma.vendor.create({ data: { tenantId: tenant.id, name: "OpenAI", category: SpendCategory.AI } })
  ]);

  const [ec2, slackEnterprise] = await Promise.all([
    prisma.product.create({ data: { tenantId: tenant.id, vendorId: aws.id, name: "EC2" } }),
    prisma.product.create({ data: { tenantId: tenant.id, vendorId: slack.id, name: "Enterprise Grid" } })
  ]);

  const contract = await prisma.contract.create({
    data: {
      tenantId: tenant.id,
      vendorId: slack.id,
      productId: slackEnterprise.id,
      status: ContractStatus.ACTIVE,
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),
      annualAmount: 200000
    }
  });

  await prisma.renewal.create({
    data: {
      tenantId: tenant.id,
      contractId: contract.id,
      dueDate: new Date("2026-07-15"),
      status: RenewalStatus.UPCOMING
    }
  });

  await prisma.benchmarkRecord.createMany({
    data: [
      { tenantId: tenant.id, vendorName: "Slack", productName: "Enterprise Grid", cohort: "1000-5000 employees", priceLow: 140000, priceMid: 170000, priceHigh: 230000, confidence: 0.82 },
      { tenantId: tenant.id, vendorName: "OpenAI", productName: "GPT-4.1", cohort: "ai-heavy", priceLow: 60000, priceMid: 90000, priceHigh: 130000, confidence: 0.71 }
    ]
  });

  await prisma.recommendation.create({
    data: {
      tenantId: tenant.id,
      type: RecommendationType.RENEWAL_RISK,
      status: RecommendationStatus.OPEN,
      title: "Slack renewal likely above benchmark midpoint",
      explanation: "Renewal in < 90 days and annual amount above benchmark midpoint for peer cohort.",
      evidence: { contractAnnualAmount: 200000, benchmarkMid: 170000 },
      estimatedSavings: 30000
    }
  });

  const scenario = await prisma.tCOScenario.create({
    data: {
      tenantId: tenant.id,
      name: "Slack vs Teams 2026",
      assumptions: { seats: 2800, growthRate: 0.08 },
      oneYear: 185000,
      threeYear: 620000,
      fiveYear: 1080000
    }
  });

  await prisma.tCOComponent.createMany({
    data: [
      { scenarioId: scenario.id, name: "License", category: "subscription", yearlyCost: 160000 },
      { scenarioId: scenario.id, name: "Admin overhead", category: "operational", yearlyCost: 25000 }
    ]
  });

  const workflow = await prisma.workflow.create({
    data: { tenantId: tenant.id, name: "Slack renewal approval", status: WorkflowStatus.ACTIVE }
  });

  await prisma.workflowTask.create({
    data: { workflowId: workflow.id, title: "Finance sign-off", status: "PENDING", dueDate: new Date("2026-05-20") }
  });

  await prisma.costRecord.createMany({
    data: [
      { tenantId: tenant.id, spendCategory: SpendCategory.AI, serviceName: "openai-gpt-4.1", amount: 22000, occurredAt: new Date("2026-04-01") },
      { tenantId: tenant.id, spendCategory: SpendCategory.SAAS, serviceName: "slack", amount: 17000, occurredAt: new Date("2026-04-01") },
      { tenantId: tenant.id, spendCategory: SpendCategory.CLOUD, serviceName: "aws-ec2", amount: 64000, occurredAt: new Date("2026-04-01") }
    ]
  });

  console.log("Seed complete");
}

main().finally(async () => {
  await prisma.$disconnect();
});
