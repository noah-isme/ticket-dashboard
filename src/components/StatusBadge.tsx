const statusClasses: Record<string, string> = {
  Open: "bg-sky-50 text-sky-700 ring-sky-200",
  "In Progress": "bg-amber-50 text-amber-800 ring-amber-200",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Closed: "bg-slate-100 text-slate-700 ring-slate-200"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusClasses[status] ?? "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      {status}
    </span>
  );
}
