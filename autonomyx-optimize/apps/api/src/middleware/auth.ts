import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { config } from "../config";

declare module "fastify" {
  interface FastifyRequest {
    auth?: { userId: string; tenantId: string; roles: string[] };
  }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return reply.unauthorized("Missing bearer token");
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    request.auth = jwt.verify(token, config.jwtSecret) as { userId: string; tenantId: string; roles: string[] };
  } catch {
    return reply.unauthorized("Invalid token");
  }
}

export function requireRole(allowed: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const roles = request.auth?.roles ?? [];
    if (!roles.some((role) => allowed.includes(role))) {
      return reply.forbidden("Insufficient role");
    }
  };
}
