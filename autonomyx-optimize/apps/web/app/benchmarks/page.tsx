export default function LiquidityPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Liquidity</p>
        <h2 className="text-3xl font-black text-slate-950">Solana pool depth</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Compare synthetic LLM token liquidity across routed pools and expected execution quality.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3">
          {[
            ["SWARM/SOL", "$21.9M", "0.18%", "Excellent"],
            ["GPTSOL/SOL", "$12.2M", "0.31%", "Strong"],
            ["CLAUDE/SOL", "$8.5M", "0.44%", "Moderate"]
          ].map(([pool, depth, spread, rating]) => (
            <div key={pool} className="grid grid-cols-4 rounded-2xl bg-slate-50 p-4 text-sm">
              <span className="font-bold text-slate-950">{pool}</span>
              <span className="text-slate-600">{depth}</span>
              <span className="text-slate-600">{spread} spread</span>
              <span className="text-right font-bold text-emerald-600">{rating}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
