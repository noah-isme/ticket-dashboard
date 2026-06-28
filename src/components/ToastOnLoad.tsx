"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

const toastMessages: Record<
  string,
  {
    message: string;
    variant: "created" | "updated";
  }
> = {
  "ticket-created": {
    message: "Ticket created successfully.",
    variant: "created"
  },
  "ticket-updated": {
    message: "Ticket updated successfully.",
    variant: "updated"
  }
};

export function ToastOnLoad({ toast }: { toast: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    const toastConfig = toastMessages[toast];

    if (!toastConfig) {
      return;
    }

    const toastId = searchParams.get("toastId") ?? "missing-id";
    const toastKey = `ticket-dashboard-toast:${toast}:${toastId}`;

    if (window.sessionStorage.getItem(toastKey)) {
      return;
    }

    window.sessionStorage.setItem(toastKey, "shown");
    showToast(toastConfig.message, toastConfig.variant);

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("toast");
    nextParams.delete("toastId");
    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams, showToast, toast]);

  return null;
}
