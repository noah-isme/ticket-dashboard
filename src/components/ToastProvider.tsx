"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";

type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastVariant = "created" | "updated" | "deleted";

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<
  ToastVariant,
  {
    border: string;
    dot: string;
  }
> = {
  created: {
    border: "border-emerald-200",
    dot: "bg-emerald-500"
  },
  updated: {
    border: "border-sky-200",
    dot: "bg-sky-500"
  },
  deleted: {
    border: "border-red-200",
    dot: "bg-red-500"
  }
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "created") => {
      nextToastId.current += 1;
      const id = nextToastId.current;
      setToasts((currentToasts) => [
        ...currentToasts,
        { id, message, variant }
      ]);
      window.setTimeout(() => dismissToast(id), 3500);
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed right-4 top-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3"
      >
        {toasts.map((toast) => (
          <div
            className={`rounded-lg border bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-soft ${
              toastStyles[toast.variant].border
            }`}
            key={toast.id}
            role="status"
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                  toastStyles[toast.variant].dot
                }`}
              />
              <span className="leading-5">{toast.message}</span>
              <button
                aria-label="Dismiss notification"
                className="ml-auto text-lg leading-none text-slate-400 hover:text-slate-700"
                onClick={() => dismissToast(toast.id)}
                type="button"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
