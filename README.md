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
- PostgreSQL
- pnpm

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database, for example Neon or Supabase

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

## Assessment Coverage

| Requirement | Status |
|---|---|
| Add tickets | Completed |
| Edit tickets | Completed |
| Update ticket status | Completed |
| Delete tickets | Completed |
| View ticket list | Completed |
| Dashboard summary | Completed |
| Responsive layout | Completed |
| Search and filter | Completed |
| Status color indicators | Completed |
| Sorting | Completed |

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create the local environment file:

```bash
cp .env.example .env
```

Then fill in:

1. `DATABASE_URL`
2. `DATABASE_URL_UNPOOLED`

Generate Prisma client:

```bash
pnpm db:generate
```

Run the database migration:

```bash
pnpm db:migrate
```

Seed the PostgreSQL database:

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
pnpm test:e2e      # Run E2E tests in headless mode (automatically seeds DB first)
pnpm test:e2e:ui   # Run E2E tests in Playwright's interactive UI mode
```

## End-to-End Testing

We have configured **Playwright** for browser-based E2E tests.

The test suite runs against the PostgreSQL database, testing the following:
- Dashboard initial rendering and stats calculation correctness.
- Creating a ticket, verifying the data in the table, and ensuring metrics increment.
- Searching and filtering by Category, Status, or Priority.
- Modifying status/priority and checking the recalculation of statistics.
- Deleting a ticket after confirming the modal dialog and verifying stats update.

To run tests:
```bash
pnpm test:e2e
```
*Note: This automatically runs database seeding before initiating tests to keep state deterministic.*

## Database

The app uses PostgreSQL through Prisma. Copy `.env.example` to `.env`, then configure the database URLs:

```txt
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

`DATABASE_URL` is used by the application. `DATABASE_URL_UNPOOLED` is used by Prisma migrations for providers such as Neon that expose both pooled and direct connections.

## Deployment Notes

This project is deployed using Vercel. The database uses PostgreSQL through Prisma. Environment variables must be configured in the deployment platform before running migrations or accessing the production database.

## Screenshots

### 1. Initial Dashboard Load
![Initial Dashboard Load](playwright-screenshots/dashboard-initial.png)

### 2. Add Ticket Form
![Add Ticket Form](playwright-screenshots/ticket-new-form.png)

### 3. Dashboard After Ticket Creation
![Dashboard After Ticket Creation](playwright-screenshots/dashboard-after-create.png)

### 4. Search and Filters Applied
![Search and Filters Applied](playwright-screenshots/dashboard-filtered.png)

### 5. Dashboard After Status and Priority Update
![Dashboard After Status and Priority Update](playwright-screenshots/dashboard-after-edit.png)

### 6. Dashboard After Ticket Deletion
![Dashboard After Ticket Deletion](playwright-screenshots/dashboard-after-delete.png)

## Known Limitations

This project does not include authentication, role-based access control, email notification, file attachments, real-time updates, export features, or advanced comment threads. The assessment scope is focused on practical ticket management.
