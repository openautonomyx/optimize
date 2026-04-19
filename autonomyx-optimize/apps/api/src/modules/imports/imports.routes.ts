import { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";
import { ImportsService } from "./imports.service";

const service = new ImportsService();

export async function importsRoutes(app: FastifyInstance) {
  await app.register(multipart);

  app.post("/imports", async (request, reply) => {
    const file = await request.file();
    if (!file) return reply.badRequest("CSV file is required");

    const sourceType = (file.fields.sourceType?.value as string) || "saas-contracts-csv";
    const buffer = await file.toBuffer();

    const job = await service.createImportJob({
      tenantId: request.auth!.tenantId,
      sourceType,
      filename: file.filename,
      buffer
    });

    return { job };
  });
}
