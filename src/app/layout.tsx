import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internal IT Ticket Dashboard",
  description: "A simple dashboard for managing internal IT support tickets."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
