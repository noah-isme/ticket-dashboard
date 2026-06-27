"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  ticketCategories,
  ticketPriorities,
  ticketStatuses
} from "@/types/ticket";

function getRequiredString(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} is required`);
  }

  return value.trim();
}

function getOptionalString(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  return value.trim();
}

function getTicketPayload(formData: FormData) {
  const title = getRequiredString(formData, "title");
  const category = getRequiredString(formData, "category");
  const priority = getRequiredString(formData, "priority");
  const status = getRequiredString(formData, "status");
  const assignedPerson = getRequiredString(formData, "assignedPerson");
  const notes = getOptionalString(formData, "notes");

  if (!ticketCategories.includes(category as never)) {
    throw new Error("Invalid category");
  }

  if (!ticketPriorities.includes(priority as never)) {
    throw new Error("Invalid priority");
  }

  if (!ticketStatuses.includes(status as never)) {
    throw new Error("Invalid status");
  }

  return {
    title,
    category,
    priority,
    status,
    assignedPerson,
    notes
  };
}

export async function createTicket(formData: FormData) {
  await prisma.ticket.create({
    data: getTicketPayload(formData)
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateTicket(id: string, formData: FormData) {
  await prisma.ticket.update({
    where: { id },
    data: getTicketPayload(formData)
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteTicket(id: string) {
  await prisma.ticket.deleteMany({
    where: { id }
  });

  revalidatePath("/");
}
