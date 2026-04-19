import { prisma } from "../../lib/prisma";

type AuditBase = {
  tenantId: string;
  actorUserId?: string;
  entityType: string;
  entityId: string;
};

export class AuditService {
  async logCreate(input: AuditBase, payload?: unknown) {
    return this.write({ ...input, action: "CREATE", payload });
  }

  async logUpdate(input: AuditBase, payload?: unknown) {
    return this.write({ ...input, action: "UPDATE", payload });
  }

  async logDelete(input: AuditBase, payload?: unknown) {
    return this.write({ ...input, action: "DELETE", payload });
  }

  async logAction(input: AuditBase, action: string, payload?: unknown) {
    return this.write({ ...input, action, payload });
  }

  private async write(input: AuditBase & { action: string; payload?: unknown }) {
    return prisma.auditLog.create({
      data: {
        tenantId: input.tenantId,
        actorUserId: input.actorUserId,
        entityType: input.entityType,
        entityId: input.entityId,
        action: input.action,
        payload: input.payload as object | undefined
      }
    });
  }
}
