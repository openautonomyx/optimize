import { createWorker } from "./queues";
import { processImportJob } from "./jobs/import-processor";
import { runRecommendationJob } from "./jobs/recommendation-runner";

createWorker("import-jobs", processImportJob);
createWorker("recommendation-jobs", runRecommendationJob);

console.log("Worker started: import-jobs, recommendation-jobs");
