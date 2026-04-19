export type RoleName = "admin" | "finance_manager" | "engineering_manager" | "viewer";

export type AuthContext = {
  userId: string;
  tenantId: string;
  roles: RoleName[];
};

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export enum RecommendationType {
  UNUSED_LICENSE = "UNUSED_LICENSE",
  RENEWAL_RISK = "RENEWAL_RISK",
  HIGH_AI_COST = "HIGH_AI_COST",
  CLOUD_IDLE = "CLOUD_IDLE",
  BENCHMARK_DEVIATION = "BENCHMARK_DEVIATION"
}
