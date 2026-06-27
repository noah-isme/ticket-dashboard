# Internal IT Ticket Dashboard

## Overview

A simple, clean, responsive dashboard for tracking and managing internal IT support tickets.

## Assessment Case

Option 1: Internal IT Ticket Dashboard.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- pnpm

## Features

- View ticket list
- Add tickets
- Edit tickets
- Update ticket status
- Delete tickets with confirmation
- Dashboard summary cards for total, open, in progress, and high-priority tickets
- Status and priority badges
- Search by ticket title or assigned person
- Filter by status, priority, and issue category
- Sort by created date, priority, or status
- Seed data with 10 sample tickets
- Responsive layout with horizontal table scrolling on small screens

## Getting Started

Install dependencies:

```bash
pnpm install
```

Generate Prisma client:

```bash
pnpm db:generate
```

Run the database migration:

```bash
pnpm db:migrate
```

Seed the SQLite database:

```bash
pnpm db:seed
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in a browser.

## Useful Commands

```bash
pnpm lint
pnpm build
pnpm db:studio
```

## Database

The app uses SQLite through Prisma. The local database URL is configured in `.env`:

```txt
DATABASE_URL="file:./dev.db"
```

The generated database file is stored under `prisma/dev.db`.

## Screenshots

Screenshots are not included in this initial repository state.

## Known Limitations

This project does not include authentication, role-based access control, email notification, file attachments, real-time updates, export features, or advanced comment threads. The assessment scope is focused on practical ticket management.
