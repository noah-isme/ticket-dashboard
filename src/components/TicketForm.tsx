import type { Ticket } from "@prisma/client";
import Link from "next/link";
import { TicketSubmitButton } from "@/components/TicketSubmitButton";
import { formatTicketDate } from "@/lib/ticket-utils";
import {
  ticketCategories,
  ticketPriorities,
  ticketStatuses
} from "@/types/ticket";

type TicketFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  ticket?: Ticket;
};

export function TicketForm({ action, submitLabel, ticket }: TicketFormProps) {
  return (
    <form
      action={action}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Ticket Title
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={ticket?.title ?? ""}
            name="title"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Issue Category
          <select
            className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={ticket?.category ?? "Hardware"}
            name="category"
            required
          >
            {ticketCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Priority
          <select
            className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={ticket?.priority ?? "Medium"}
            name="priority"
            required
          >
            {ticketPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Status
          <select
            className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={ticket?.status ?? "Open"}
            name="status"
            required
          >
            {ticketStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Assigned Person
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={ticket?.assignedPerson ?? ""}
            name="assignedPerson"
            required
          />
        </label>

        {ticket ? (
          <div className="flex flex-col gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
            <span className="font-medium">Created Date</span>
            <span>{formatTicketDate(ticket.createdAt)}</span>
          </div>
        ) : null}

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Notes
          <textarea
            className="min-h-32 rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            defaultValue={ticket?.notes ?? ""}
            name="notes"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <TicketSubmitButton label={submitLabel} />
        <Link
          className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          href="/"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
