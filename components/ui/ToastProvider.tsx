"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        className:
          "bg-white border border-border shadow-lg rounded-md text-foreground",
        duration: 3000,
      }}
    />
  );
}


