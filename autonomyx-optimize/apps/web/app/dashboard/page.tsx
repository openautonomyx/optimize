import { StatCard } from "../../components/dashboard/stat-card";

export default function PortfolioPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Portfolio</p>
        <h2 className="text-3xl font-black text-slate-950">Solana token balances</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Monitor LLM token exposure, unsettled ATP agent fees, and wallet-ready buying power.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Portfolio Value" value="$42,860" />
        <StatCard label="SOL Available" value="184.3" />
        <StatCard label="ATP Fees Pending" value="$128" />
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">Holdings</h3>
        <div className="mt-4 grid gap-3">
          {[
            ["SWARM", "42,000", "+31.2%", "$26,880"],
            ["GPTSOL", "3,400", "+18.4%", "$9,656"],
            ["CLAUDE", "888", "+9.7%", "$6,323"]
          ].map(([symbol, quantity, change, value]) => (
            <div key={symbol} className="grid grid-cols-4 rounded-2xl bg-slate-50 p-4 text-sm">
              <span className="font-bold text-slate-950">{symbol}</span>
              <span className="text-slate-600">{quantity}</span>
              <span className="font-semibold text-emerald-600">{change}</span>
              <span className="text-right font-bold text-slate-950">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
