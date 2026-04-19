import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { prisma } from "../../lib/prisma";

type CreateImportInput = {
  tenantId: string;
  sourceType: string;
  filename: string;
  buffer: Buffer;
};

export class ImportsService {
  async createImportJob(input: CreateImportInput) {
    const fileHash = crypto.createHash("sha256").update(input.buffer).digest("hex");
    const idempotencyKey = `${input.tenantId}:${input.sourceType}:${fileHash}`;

    const existing = await prisma.importJob.findUnique({ where: { idempotencyKey } });
    if (existing) return existing;

    await fs.mkdir("uploads", { recursive: true });
    const filename = `${Date.now()}-${path.basename(input.filename)}`;
    await fs.writeFile(path.join("uploads", filename), input.buffer);

    return prisma.importJob.create({
      data: {
        tenantId: input.tenantId,
        sourceType: input.sourceType,
        filename,
        fileHash,
        idempotencyKey
      }
    });
  }
}
