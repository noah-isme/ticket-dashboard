const priorityClasses: Record<string, string> = {
  Low: "bg-slate-100 text-slate-700 ring-slate-200",
  Medium: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  High: "bg-orange-50 text-orange-700 ring-orange-200",
  Critical: "bg-red-50 text-red-700 ring-red-200"
};

export function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        priorityClasses[priority] ??
        "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      {priority}
    </span>
  );
}
