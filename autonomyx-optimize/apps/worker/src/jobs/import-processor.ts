import { Job } from "bullmq";
import { prisma } from "@autonomyx/db/src/client";

export async function processImportJob(job: Job<{ importJobId: string }>) {
  const record = await prisma.importJob.findUnique({ where: { id: job.data.importJobId } });
  if (!record) return;

  await prisma.importJob.update({
    where: { id: record.id },
    data: { status: "PROCESSING" }
  });

  // TODO: connector-specific parser pipeline + normalization graph loader

  await prisma.importJob.update({
    where: { id: record.id },
    data: { status: "COMPLETED", completedAt: new Date() }
  });
}
