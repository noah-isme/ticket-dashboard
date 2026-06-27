import Link from "next/link";
import {
  ticketCategories,
  ticketPriorities,
  ticketStatuses,
  type TicketSort
} from "@/types/ticket";

type TicketFiltersProps = {
  filters: {
    search: string;
    status: string;
    priority: string;
    category: string;
    sort: TicketSort;
  };
};

export function TicketFilters({ filters }: TicketFiltersProps) {
  return (
    <form className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_repeat(4,minmax(150px,190px))_auto]">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Search
          <input
            className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={filters.search}
            name="search"
            placeholder="Title or assigned person"
            type="search"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Status
          <select
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={filters.status}
            name="status"
          >
            <option value="">All statuses</option>
            {ticketStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Priority
          <select
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={filters.priority}
            name="priority"
          >
            <option value="">All priorities</option>
            {ticketPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Category
          <select
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={filters.category}
            name="category"
          >
            <option value="">All categories</option>
            {ticketCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Sort
          <select
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={filters.sort}
            name="sort"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </label>

        <div className="flex items-end gap-2">
          <button
            className="h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            type="submit"
          >
            Apply
          </button>
          <Link
            className="flex h-10 items-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            href="/"
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
}
