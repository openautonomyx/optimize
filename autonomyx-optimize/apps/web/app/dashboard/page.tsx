import { StatCard } from "../../components/dashboard/stat-card";

const modes = [
  {
    name: "SaaS Cost Optimization",
    buyer: "CFO, IT, Procurement",
    metric: "SaaS savings",
    focus: "Unused seats, duplicate tools, over-provisioned plans, and renewal exposure"
  },
  {
    name: "LLM Cost Optimization",
    buyer: "AI Engineering, CTO, Product",
    metric: "Cost per AI task",
    focus: "Model routing, token spend, prompt bloat, retries, caching, and context trimming"
  },
  {
    name: "Cloud FinOps",
    buyer: "Platform, DevOps, Finance",
    metric: "Cloud cost reduction",
    focus: "Idle compute, unattached storage, unused IPs, reserved capacity, and rightsizing"
  }
];

const workflow = ["Ingest", "Analyze", "Recommend", "Simulate", "Execute or route", "Measure"];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Optimizing Agent</p>
        <h2 className="text-2xl font-semibold">One agent for SaaS waste, LLM spend, and cloud FinOps</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Autonomyx Optimize ingests spend, usage, contract, billing, and telemetry data, then identifies
          savings opportunities, prioritizes recommendations, and routes cost-saving actions with governance
          and auditability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Spend" value="$1.23M" />
        <StatCard label="Renewals Due (90d)" value={8} />
        <StatCard label="Open Recommendations" value={21} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {modes.map((mode) => (
          <article className="rounded-lg border bg-white p-4 shadow-sm" key={mode.name}>
            <h3 className="font-semibold text-slate-950">{mode.name}</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Buyer</dt>
                <dd className="text-slate-700">{mode.buyer}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Main metric</dt>
                <dd className="text-slate-700">{mode.metric}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Focus</dt>
                <dd className="text-slate-700">{mode.focus}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h3 className="font-semibold text-slate-950">Agent workflow</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
          {workflow.map((step, index) => (
            <div className="rounded-md bg-slate-50 p-3 text-sm" key={step}>
              <p className="text-xs font-semibold text-brand-700">{index + 1}</p>
              <p className="font-medium text-slate-900">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
