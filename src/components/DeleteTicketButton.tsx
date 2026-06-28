"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteTicket } from "@/actions/ticket-actions";
import { useToast } from "@/components/ToastProvider";

type DeleteTicketButtonProps = {
  id: string;
  title: string;
};

export function DeleteTicketButton({ id, title }: DeleteTicketButtonProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function confirmDelete() {
    startTransition(async () => {
      await deleteTicket(id);
      setIsDialogOpen(false);
      router.refresh();
      showToast("Ticket deleted successfully.", "deleted");
    });
  }

  return (
    <>
      <button
        className="text-sm font-medium text-red-700 hover:text-red-900 disabled:cursor-not-allowed disabled:text-slate-400"
        disabled={isPending}
        onClick={() => setIsDialogOpen(true)}
        type="button"
      >
        Delete
      </button>

      {isDialogOpen ? (
        <div
          aria-labelledby={`delete-ticket-title-${id}`}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4"
          role="dialog"
        >
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
            <h2
              className="text-lg font-semibold text-slate-950"
              id={`delete-ticket-title-${id}`}
            >
              Delete ticket?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This will permanently delete{" "}
              <span className="font-semibold text-slate-800">{title}</span>{" "}
              from the dashboard.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isPending}
                onClick={() => setIsDialogOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-300"
                disabled={isPending}
                onClick={confirmDelete}
                type="button"
              >
                {isPending ? "Deleting..." : "Delete Ticket"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
