import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  ["/trade", "Trade"],
  ["/dashboard", "Portfolio"],
  ["/recommendations", "Agent Signals"],
  ["/benchmarks", "Liquidity"],
  ["/tco", "Fees"]
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur lg:inset-y-0 lg:right-auto lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-4 px-4 py-4 lg:block lg:p-5">
          <Link href="/trade" className="block">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Solana ATP</p>
            <h1 className="text-lg font-black tracking-tight">Token Trader</h1>
          </Link>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
            Network online
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 text-sm lg:block lg:space-y-2 lg:px-5 lg:pt-3">
          {navItems.map(([href, label]) => (
            <Link
              className="whitespace-nowrap rounded-xl px-3 py-2 font-medium text-slate-300 transition hover:bg-white/10 hover:text-white lg:block"
              key={href}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mx-5 mt-6 hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50 lg:block">
          <p className="font-bold">ATP settlement</p>
          <p className="mt-2 text-cyan-100/75">Usage-metered AI agent outputs settle automatically over Solana rails.</p>
        </div>
      </aside>
      <main className="px-4 pb-8 pt-32 sm:px-6 lg:ml-64 lg:px-8 lg:pt-8">{children}</main>
    </div>
  );
}
