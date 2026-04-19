import { FastifyReply, FastifyRequest } from "fastify";

export async function tenantMiddleware(request: FastifyRequest, reply: FastifyReply) {
  if (!request.auth?.tenantId) {
    return reply.forbidden("Tenant context required");
  }
  request.headers["x-tenant-id"] = request.auth.tenantId;
}
