import { notFound } from "next/navigation";
import { updateTicket } from "@/actions/ticket-actions";
import { TicketForm } from "@/components/TicketForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EditTicketPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTicketPage({ params }: EditTicketPageProps) {
  const { id } = await params;
  const ticket = await prisma.ticket.findUnique({
    where: { id }
  });

  if (!ticket) {
    notFound();
  }

  const action = updateTicket.bind(null, ticket.id);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Ticket Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">
            Edit Ticket
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Update the ticket details, status, assigned person, and notes.
          </p>
        </header>

        <TicketForm action={action} submitLabel="Save Changes" ticket={ticket} />
      </div>
    </main>
  );
}
