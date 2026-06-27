import Link from "next/link";

export function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <h2 className="text-base font-semibold text-slate-950">
        No tickets found
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Adjust the search or filter criteria, or add a new ticket.
      </p>
      <Link
        className="mt-5 inline-flex items-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        href="/tickets/new"
      >
        Add Ticket
      </Link>
    </div>
  );
}
