import { createContext, useContext } from "react";

export type Toast = {
  message: string;
  type?: "success" | "error";
};

export type ToastContextType = {
  toast: Toast | null;
  showToast: (msg: string, type?: "success" | "error") => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}