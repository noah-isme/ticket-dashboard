import { createTicket } from "@/actions/ticket-actions";
import { TicketForm } from "@/components/TicketForm";

export default function NewTicketPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Ticket Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
            Add Ticket
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create a support ticket with the current priority, owner, and
            status.
          </p>
        </header>

        <TicketForm action={createTicket} submitLabel="Create Ticket" />
      </div>
    </main>
  );
}
