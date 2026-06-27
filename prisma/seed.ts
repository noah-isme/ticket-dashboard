import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Laptop cannot connect to WiFi",
    category: "Network",
    priority: "High",
    status: "Open",
    assignedPerson: "Andi Pratama",
    notes: "User reports the issue happens in meeting rooms only."
  },
  {
    title: "Email account locked",
    category: "Account",
    priority: "Medium",
    status: "In Progress",
    assignedPerson: "Sinta Dewi",
    notes: "Identity verification is complete."
  },
  {
    title: "Printer not responding",
    category: "Hardware",
    priority: "Low",
    status: "Resolved",
    assignedPerson: "Budi Santoso",
    notes: "Printer queue was cleared and driver was refreshed."
  },
  {
    title: "VPN access issue",
    category: "Network",
    priority: "Critical",
    status: "Open",
    assignedPerson: "Raka Wijaya",
    notes: "Remote access blocks payroll team member."
  },
  {
    title: "Software installation request",
    category: "Software",
    priority: "Medium",
    status: "Closed",
    assignedPerson: "Dina Maharani",
    notes: "Approved package has been installed."
  },
  {
    title: "Monitor flickering",
    category: "Hardware",
    priority: "Medium",
    status: "In Progress",
    assignedPerson: "Fajar Nugroho",
    notes: "Testing replacement HDMI cable."
  },
  {
    title: "Cannot access shared drive",
    category: "Network",
    priority: "High",
    status: "Open",
    assignedPerson: "Rani Putri",
    notes: "Access group membership needs review."
  },
  {
    title: "Password reset request",
    category: "Account",
    priority: "Low",
    status: "Resolved",
    assignedPerson: "Sinta Dewi",
    notes: "Temporary password issued."
  },
  {
    title: "Antivirus license expired",
    category: "Software",
    priority: "High",
    status: "In Progress",
    assignedPerson: "Andi Pratama",
    notes: "License renewal requested from procurement."
  },
  {
    title: "Keyboard replacement request",
    category: "Hardware",
    priority: "Low",
    status: "Closed",
    assignedPerson: "Budi Santoso",
    notes: "Replacement unit delivered."
  }
];

async function main() {
  await prisma.ticket.deleteMany();
  await prisma.ticket.createMany({ data: tickets });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
