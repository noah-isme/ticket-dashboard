import type { Ticket } from "@prisma/client";
import type { TicketSort } from "@/types/ticket";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

const priorityRank: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3
};

const statusRank: Record<string, number> = {
  Open: 0,
  "In Progress": 1,
  Resolved: 2,
  Closed: 3
};

export function formatTicketDate(date: Date) {
  return dateFormatter.format(date);
}

export function calculateTicketSummary(tickets: Ticket[]) {
  return {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "Open").length,
    inProgress: tickets.filter((ticket) => ticket.status === "In Progress")
      .length,
    highPriority: tickets.filter(
      (ticket) => ticket.priority === "High" || ticket.priority === "Critical"
    ).length
  };
}

export function sortTickets(tickets: Ticket[], sort: TicketSort) {
  return [...tickets].sort((a, b) => {
    if (sort === "oldest") {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    if (sort === "priority") {
      return (
        (priorityRank[a.priority] ?? 99) - (priorityRank[b.priority] ?? 99) ||
        b.createdAt.getTime() - a.createdAt.getTime()
      );
    }

    if (sort === "status") {
      return (
        (statusRank[a.status] ?? 99) - (statusRank[b.status] ?? 99) ||
        b.createdAt.getTime() - a.createdAt.getTime()
      );
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export function getSingleParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}
