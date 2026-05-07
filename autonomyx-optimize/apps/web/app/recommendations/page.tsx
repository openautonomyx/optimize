export default function AgentSignalsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Agent Signals</p>
        <h2 className="text-3xl font-black text-slate-950">AI-assisted trade recommendations</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Risk, routing, and sentiment agents surface suggested actions before orders are signed.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          ["Route optimizer", "Split GPTSOL order across two liquidity pools to reduce price impact by 3.8%."],
          ["Volatility guard", "Lower SWARM order size until the 30-minute variance returns below strategy limits."],
          ["ATP usage agent", "Batch model-analysis calls to save 22% on usage-based Solana settlement fees."]
        ].map(([title, body]) => (
          <article key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
