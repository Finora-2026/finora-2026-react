import { useState } from "react";
import * as React from "react";
import styles from "./ToastProvider.module.scss";
import { toastConfig } from "./toastConfig";
import {type Toast, ToastContext} from "./toastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), toastConfig.duration);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}

      {toast && (
        <div
          className={`${styles.toast} ${toast.type ? styles[toast.type] : ""}`}
          style={{ animationDuration: `${toastConfig.duration}ms` }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}