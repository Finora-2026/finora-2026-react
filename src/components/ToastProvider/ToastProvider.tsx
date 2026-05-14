import { useState } from "react";
import * as React from "react";
import styles from "./ToastProvider.module.scss";
import { toastConfig } from "./toastConfig";
import {type Toast, ToastContext} from "./toastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    const id = crypto.randomUUID();
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toastConfig.duration);
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.type ?? "success"]}`}
            style={{ animationDuration: `${toastConfig.duration}ms` }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}