import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { env } from "@autonomyx/config";

const connection = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: null });

export const importQueue = new Queue("import-jobs", { connection });
export const recommendationQueue = new Queue("recommendation-jobs", { connection });

export const createWorker = (name: string, processor: Parameters<typeof Worker>[1]) => {
  return new Worker(name, processor, { connection });
};
