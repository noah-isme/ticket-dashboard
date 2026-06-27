export const ticketCategories = [
  "Hardware",
  "Software",
  "Network",
  "Account",
  "Other"
] as const;

export const ticketPriorities = ["Low", "Medium", "High", "Critical"] as const;

export const ticketStatuses = [
  "Open",
  "In Progress",
  "Resolved",
  "Closed"
] as const;

export type TicketCategory = (typeof ticketCategories)[number];
export type TicketPriority = (typeof ticketPriorities)[number];
export type TicketStatus = (typeof ticketStatuses)[number];

export type TicketSort = "newest" | "oldest" | "priority" | "status";
