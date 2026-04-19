import { StatCard } from "../../components/dashboard/stat-card";

export default function DashboardPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Spend Operations Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Spend" value="$1.23M" />
        <StatCard label="Renewals Due (90d)" value={8} />
        <StatCard label="Open Recommendations" value={21} />
      </div>
    </section>
  );
}
