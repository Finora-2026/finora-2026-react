import { createContext, useContext, useState } from "react";
import * as React from "react";
import styles from "./ToastProvider.module.scss";

type Toast = {
  message: string;
  type?: "success" | "error";
};

type ToastContextType = {
  toast: Toast | null;
  showToast: (msg: string, type?: "success" | "error") => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}

      {toast && (
        <div
        className={`${styles.toast} ${
        toast.type ? styles[toast.type] : ""
      }`}
    >
      {toast.message}
    </div>


      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}