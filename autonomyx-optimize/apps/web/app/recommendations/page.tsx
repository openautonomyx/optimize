const recommendations = [
  {
    mode: "SaaS Cost Optimization",
    title: "Downgrade inactive enterprise seats",
    detail: "42 seats show low utilization and can move to Pro before the June renewal.",
    impact: "$38K estimated savings"
  },
  {
    mode: "LLM Cost Optimization",
    title: "Route simple classification to a smaller model",
    detail: "Historical quality is stable enough to test lower-cost routing with fallback controls.",
    impact: "27% lower cost per AI task"
  },
  {
    mode: "Cloud FinOps",
    title: "Downsize staging database",
    detail: "CPU and memory utilization support reducing staging from 4 vCPU to 2 vCPU.",
    impact: "$9K annual run-rate reduction"
  }
];

export default function RecommendationsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Optimization Recommendations</h2>
        <p className="mt-2 text-sm text-slate-600">
          Savings actions are organized by SaaS Cost Optimization, LLM Cost Optimization, and Cloud FinOps modes.
        </p>
      </div>
      <div className="grid gap-4">
        {recommendations.map((recommendation) => (
          <article className="rounded-lg border bg-white p-4 shadow-sm" key={recommendation.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{recommendation.mode}</p>
            <h3 className="mt-1 font-semibold text-slate-950">{recommendation.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{recommendation.detail}</p>
            <p className="mt-3 text-sm font-medium text-emerald-700">{recommendation.impact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
