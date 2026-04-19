export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white border p-4 shadow-sm">
      <p className="text-xs uppercase text-slate-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
