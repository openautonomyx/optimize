import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  ["/dashboard", "Dashboard"],
  ["/recommendations", "Recommendations"],
  ["/renewals", "Renewals"],
  ["/benchmarks", "Benchmarks"],
  ["/tco", "TCO"]
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      <aside className="bg-brand-950 text-white p-4">
        <h1 className="font-semibold text-lg mb-6">Autonomyx Optimize</h1>
        <nav className="space-y-2 text-sm">
          {navItems.map(([href, label]) => (
            <Link className="block p-2 rounded hover:bg-brand-900" key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
