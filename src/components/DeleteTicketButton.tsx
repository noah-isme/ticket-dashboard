"use client";

import { deleteTicket } from "@/actions/ticket-actions";

type DeleteTicketButtonProps = {
  id: string;
  title: string;
};

export function DeleteTicketButton({ id, title }: DeleteTicketButtonProps) {
  const deleteAction = deleteTicket.bind(null, id);

  return (
    <form
      action={deleteAction}
      onSubmit={(event) => {
        if (!window.confirm(`Delete ticket "${title}"?`)) {
          event.preventDefault();
        }
      }}
    >
      <button
        className="text-sm font-medium text-red-700 hover:text-red-900"
        type="submit"
      >
        Delete
      </button>
    </form>
  );
}
