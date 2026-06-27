import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { DashboardCards } from "@/components/DashboardCards";
import { EmptyState } from "@/components/EmptyState";
import { TicketFilters } from "@/components/TicketFilters";
import { TicketTable } from "@/components/TicketTable";
import { prisma } from "@/lib/prisma";
import {
  calculateTicketSummary,
  getSingleParam,
  sortTickets
} from "@/lib/ticket-utils";
import {
  ticketCategories,
  ticketPriorities,
  ticketStatuses,
  type TicketSort
} from "@/types/ticket";

export const dynamic = "force-dynamic";

type DashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getFilters(params: Record<string, string | string[] | undefined>) {
  const search = getSingleParam(params.search).trim();
  const status = getSingleParam(params.status);
  const priority = getSingleParam(params.priority);
  const category = getSingleParam(params.category);
  const requestedSort = getSingleParam(params.sort);
  const sort: TicketSort = ["newest", "oldest", "priority", "status"].includes(
    requestedSort
  )
    ? (requestedSort as TicketSort)
    : "newest";

  return {
    search,
    status: ticketStatuses.includes(status as never) ? status : "",
    priority: ticketPriorities.includes(priority as never) ? priority : "",
    category: ticketCategories.includes(category as never) ? category : "",
    sort
  };
}

function buildWhere(filters: ReturnType<typeof getFilters>) {
  const where: Prisma.TicketWhereInput = {};

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { assignedPerson: { contains: filters.search } }
    ];
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (filters.category) {
    where.category = filters.category;
  }

  return where;
}

export default async function DashboardPage({
  searchParams
}: DashboardPageProps) {
  const params = (await searchParams) ?? {};
  const filters = getFilters(params);
  const where = buildWhere(filters);

  const [allTickets, filteredTickets] = await Promise.all([
    prisma.ticket.findMany(),
    prisma.ticket.findMany({
      where,
      orderBy: {
        createdAt: filters.sort === "oldest" ? "asc" : "desc"
      }
    })
  ]);

  const summary = calculateTicketSummary(allTickets);
  const tickets = sortTickets(filteredTickets, filters.sort);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              Internal IT Support
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
              Ticket Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Track internal support requests, ownership, priority, and ticket
              progress from one responsive dashboard.
            </p>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            href="/tickets/new"
          >
            Add Ticket
          </Link>
        </header>

        <DashboardCards summary={summary} />
        <TicketFilters filters={filters} />

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-950">
              Ticket List
            </h2>
            <p className="text-sm text-slate-500">
              Showing {tickets.length} of {allTickets.length} tickets
            </p>
          </div>

          {tickets.length > 0 ? (
            <TicketTable tickets={tickets} />
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
}
