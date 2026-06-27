type DashboardCardsProps = {
  summary: {
    total: number;
    open: number;
    inProgress: number;
    highPriority: number;
  };
};

const cards = [
  {
    key: "total",
    label: "Total Tickets",
    accent: "border-l-slate-700"
  },
  {
    key: "open",
    label: "Open Tickets",
    accent: "border-l-sky-500"
  },
  {
    key: "inProgress",
    label: "In Progress Tickets",
    accent: "border-l-amber-500"
  },
  {
    key: "highPriority",
    label: "High Priority Tickets",
    accent: "border-l-red-500"
  }
] as const;

export function DashboardCards({ summary }: DashboardCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          className={`rounded-lg border border-slate-200 border-l-4 bg-white p-5 shadow-soft ${card.accent}`}
          key={card.key}
        >
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
            {summary[card.key]}
          </p>
        </article>
      ))}
    </section>
  );
}
