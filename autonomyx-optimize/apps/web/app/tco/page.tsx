export default function FeesPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Fees</p>
        <h2 className="text-3xl font-black text-slate-950">Execution and ATP settlement costs</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Estimate Solana network fees, agent usage charges, and treasury splits before trading.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Network", "~0.00001 SOL", "Typical Solana transaction fee per signed order."],
          ["Agent usage", "0.25%", "Metered fee for premium routing and risk model calls."],
          ["ATP split", "95/5", "Recipient and treasury split for usage-based services."]
        ].map(([label, value, body]) => (
          <article key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
