"use client";

import { useMemo, useState } from "react";

type Token = {
  symbol: string;
  name: string;
  price: number;
  change: string;
  volume: string;
  liquidity: string;
  sparkline: string;
  tone: "cyan" | "violet" | "emerald";
};

const tokens: Token[] = [
  {
    symbol: "GPTSOL",
    name: "GPT Token",
    price: 2.84,
    change: "+18.4%",
    volume: "$4.8M",
    liquidity: "$12.2M",
    sparkline: "M0 28 C18 12 30 36 46 18 S78 12 96 6",
    tone: "cyan"
  },
  {
    symbol: "CLAUDE",
    name: "Claude Index",
    price: 7.12,
    change: "+9.7%",
    volume: "$2.1M",
    liquidity: "$8.5M",
    sparkline: "M0 30 C12 28 24 8 38 14 S62 38 96 10",
    tone: "violet"
  },
  {
    symbol: "SWARM",
    name: "Agent Swarm",
    price: 0.64,
    change: "+31.2%",
    volume: "$9.4M",
    liquidity: "$21.9M",
    sparkline: "M0 34 C20 30 22 20 40 22 S58 2 96 8",
    tone: "emerald"
  }
];

const recentTrades = [
  ["Buy", "SWARM", "12,540", "$8,025", "7s ago"],
  ["Sell", "GPTSOL", "1,820", "$5,168", "19s ago"],
  ["Buy", "CLAUDE", "420", "$2,990", "44s ago"],
  ["Buy", "GPTSOL", "3,100", "$8,804", "1m ago"]
];

const agentSignals = [
  "ATP agent settlement ready: SOL payment rails enabled for usage-based model calls.",
  "Liquidity scanner detects 4.2% better route through Orca + Jupiter split execution.",
  "Risk agent capped slippage at 0.7% because SWARM volatility expanded over 30 minutes."
];

const toneClasses = {
  cyan: "from-cyan-400/25 to-blue-500/10 text-cyan-200 border-cyan-300/20",
  violet: "from-violet-400/25 to-fuchsia-500/10 text-violet-200 border-violet-300/20",
  emerald: "from-emerald-400/25 to-teal-500/10 text-emerald-200 border-emerald-300/20"
};

export function TokenTradingDashboard() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [side, setSide] = useState<"Buy" | "Sell">("Buy");
  const [amount, setAmount] = useState("250");
  const [walletConnected, setWalletConnected] = useState(false);

  const estimate = useMemo(() => {
    const parsedAmount = Number(amount) || 0;
    const tokenQuantity = parsedAmount / selectedToken.price;
    const networkFee = Math.max(parsedAmount * 0.00018, 0.0015);
    const agentFee = parsedAmount * 0.0025;
    return {
      tokenQuantity,
      networkFee,
      agentFee,
      total: side === "Buy" ? parsedAmount + networkFee + agentFee : Math.max(parsedAmount - networkFee - agentFee, 0)
    };
  }, [amount, selectedToken.price, side]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 text-white shadow-2xl shadow-cyan-950/30">
        <div className="relative isolate grid gap-8 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(168,85,247,0.24),transparent_32%),linear-gradient(135deg,#020617,#0f172a_48%,#111827)]" />
          <div className="space-y-7">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              Solana-powered LLM token exchange
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
                Trade AI model tokens with agentic ATP settlement.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                A real-time trading terminal for LLM utility tokens, combining Solana-speed swaps,
                wallet-gated execution, and usage-based agent payments inspired by Swarms ATP.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["24h volume", "$16.3M"],
                ["Avg. finality", "~400ms"],
                ["ATP fee split", "95/5"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Featured market</p>
                <h2 className="text-3xl font-bold">{selectedToken.symbol}/SOL</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                Live
              </span>
            </div>
            <div className="mt-7 rounded-2xl bg-slate-950/70 p-4">
              <svg viewBox="0 0 96 42" className="h-36 w-full overflow-visible" aria-label="Price sparkline">
                <defs>
                  <linearGradient id="chartGlow" x1="0" x2="1" y1="0" y2="0">
                    <stop stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <path d={selectedToken.sparkline} fill="none" stroke="url(#chartGlow)" strokeLinecap="round" strokeWidth="4" />
              </svg>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Price</p>
                <p className="font-semibold">${selectedToken.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-400">Change</p>
                <p className="font-semibold text-emerald-300">{selectedToken.change}</p>
              </div>
              <div>
                <p className="text-slate-400">Liquidity</p>
                <p className="font-semibold">{selectedToken.liquidity}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Markets</h2>
              <p className="text-sm text-slate-500">LLM token pools routed over Solana DEX liquidity.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">Devnet preview</span>
          </div>
          <div className="grid gap-3">
            {tokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token)}
                className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                  selectedToken.symbol === token.symbol
                    ? "border-cyan-300 bg-cyan-50 shadow-cyan-100"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl border bg-gradient-to-br ${toneClasses[token.tone]}`}>
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-950">{token.symbol}</p>
                      <p className="text-sm text-slate-500">{token.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-right text-sm">
                    <div>
                      <p className="text-slate-400">Price</p>
                      <p className="font-semibold text-slate-950">${token.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">24h</p>
                      <p className="font-semibold text-emerald-600">{token.change}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Volume</p>
                      <p className="font-semibold text-slate-950">{token.volume}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Swap ticket</h2>
              <p className="text-sm text-slate-500">Estimate execution before signing in your Solana wallet.</p>
            </div>
            <button
              onClick={() => setWalletConnected((connected) => !connected)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                walletConnected ? "bg-emerald-100 text-emerald-700" : "bg-slate-950 text-white hover:bg-slate-800"
              }`}
            >
              {walletConnected ? "Wallet connected" : "Connect wallet"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            {(["Buy", "Sell"] as const).map((tradeSide) => (
              <button
                key={tradeSide}
                onClick={() => setSide(tradeSide)}
                className={`rounded-xl py-3 text-sm font-bold transition ${
                  side === tradeSide ? "bg-white text-slate-950 shadow" : "text-slate-500"
                }`}
              >
                {tradeSide}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-sm font-semibold text-slate-700" htmlFor="tradeAmount">
            Amount in USDC
          </label>
          <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-slate-400">$</span>
            <input
              id="tradeAmount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              inputMode="decimal"
              className="w-full bg-transparent px-2 text-3xl font-black text-slate-950 outline-none"
            />
            <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-600">USDC</span>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-500">You {side === "Buy" ? "receive" : "sell"}</span>
              <span className="font-bold text-slate-950">
                {estimate.tokenQuantity.toFixed(4)} {selectedToken.symbol}
              </span>
            </div>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex justify-between"><span>Solana network fee</span><span>{estimate.networkFee.toFixed(4)} USDC</span></div>
              <div className="flex justify-between"><span>ATP agent fee</span><span>{estimate.agentFee.toFixed(4)} USDC</span></div>
              <div className="flex justify-between"><span>Max slippage</span><span>0.7%</span></div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="font-semibold text-slate-600">Estimated total</span>
              <span className="text-xl font-black text-slate-950">${estimate.total.toFixed(2)}</span>
            </div>
          </div>

          <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01]">
            {walletConnected ? `Sign ${side} order` : "Connect wallet to trade"}
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Agent settlement</h2>
          <p className="mt-1 text-sm text-slate-500">
            ATP-style usage metering encrypts premium agent outputs until Solana payment confirmation.
          </p>
          <div className="mt-5 space-y-3">
            {agentSignals.map((signal, index) => (
              <div key={signal} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-600">{signal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recent trades</h2>
              <p className="text-sm text-slate-400">On-chain fills and simulated terminal activity.</p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-cyan-200">Solana mainnet</span>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  {['Side', 'Token', 'Qty', 'Value', 'Time'].map((heading) => (
                    <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentTrades.map(([tradeSide, token, quantity, value, time]) => (
                  <tr key={`${tradeSide}-${token}-${time}`}>
                    <td className={`px-4 py-3 font-bold ${tradeSide === "Buy" ? "text-emerald-300" : "text-rose-300"}`}>{tradeSide}</td>
                    <td className="px-4 py-3">{token}</td>
                    <td className="px-4 py-3 text-slate-300">{quantity}</td>
                    <td className="px-4 py-3 text-slate-300">{value}</td>
                    <td className="px-4 py-3 text-slate-500">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
