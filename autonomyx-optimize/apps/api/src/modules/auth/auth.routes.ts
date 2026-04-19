import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "../../config";
import { prisma } from "../../lib/prisma";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (request, reply) => {
    const body = loginSchema.parse(request.body);
    const user = await prisma.user.findFirst({ where: { email: body.email, isActive: true }, include: { roleAssignments: { include: { role: true } } } });
    if (!user) return reply.unauthorized("Invalid credentials");

    // TODO: replace with bcrypt verify
    if (body.password !== "password123") return reply.unauthorized("Invalid credentials");

    const token = jwt.sign(
      {
        userId: user.id,
        tenantId: user.tenantId,
        roles: user.roleAssignments.map((ra) => ra.role.name)
      },
      config.jwtSecret,
      { expiresIn: "8h" }
    );

    return { token };
  });
}
