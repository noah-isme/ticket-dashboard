import type { Ticket } from "@prisma/client";
import Link from "next/link";
import { DeleteTicketButton } from "@/components/DeleteTicketButton";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { formatTicketDate } from "@/lib/ticket-utils";

type TicketTableProps = {
  tickets: Ticket[];
};

export function TicketTable({ tickets }: TicketTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-normal text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Ticket Title</th>
              <th className="px-4 py-3 font-semibold">Issue Category</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Assigned Person</th>
              <th className="px-4 py-3 font-semibold">Created Date</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tickets.map((ticket) => (
              <tr className="align-top hover:bg-slate-50" key={ticket.id}>
                <td className="max-w-[280px] px-4 py-4">
                  <p className="font-semibold text-slate-950">{ticket.title}</p>
                  {ticket.notes ? (
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                      {ticket.notes}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-4 text-slate-700">{ticket.category}</td>
                <td className="px-4 py-4">
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-4 py-4 text-slate-700">
                  {ticket.assignedPerson}
                </td>
                <td className="px-4 py-4 text-slate-700">
                  {formatTicketDate(ticket.createdAt)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      className="text-sm font-medium text-slate-950 hover:text-slate-600"
                      href={`/tickets/${ticket.id}/edit`}
                    >
                      Edit
                    </Link>
                    <DeleteTicketButton id={ticket.id} title={ticket.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
