import { useEffect, useState } from "react";
import styles from "./AccountList.module.scss";
import {
  accountService,
  type AccountResponseDto,
} from "../../utils/accountService.ts";
import {useToast} from "../../components/ToastProvider/toastContext.ts";

type Mode = "all" | "active" | "inactive";

export default function AccountList() {
  const { showToast } = useToast();
  const [mode, setMode] = useState<Mode>("active");
  
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const loadAccounts = async () => {
      setLoading(true);
      setError("");
      
      try {
        let data: AccountResponseDto[];
        
        if (mode === "all") {
          data = await accountService.getAllAccounts();
        } else if (mode === "active") {
          data = await accountService.getActiveAccounts();
        } else {
          data = await accountService.getInactiveAccounts();
        }
        
        setAccounts(data);
      } catch (err) {
        console.error("Failed to load accounts", err);
        
        setAccounts([]);
        setError("Failed to load accounts");
        showToast("Failed to load accounts", "error");
      } finally {
        setLoading(false);
      }
    };
    
    loadAccounts();
  }, [mode, showToast]);
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Title */}
        <h2 className={styles.title}>Your Accounts</h2>
        
        {/* Toggle */}
        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleButton} ${
              mode === "all" ? styles.activeToggle : ""
            }`}
            onClick={() => setMode("all")}
          >
            All
          </button>
          
          <button
            className={`${styles.toggleButton} ${
              mode === "active" ? styles.activeToggle : ""
            }`}
            onClick={() => setMode("active")}
          >
            Active
          </button>
          
          <button
            className={`${styles.toggleButton} ${
              mode === "inactive" ? styles.activeToggle : ""
            }`}
            onClick={() => setMode("inactive")}
          >
            Inactive
          </button>
        </div>
        
        {/* Loading */}
        {loading && (
          <div className={styles.empty}>Loading accounts...</div>
        )}
        
        {/* Error */}
        {!loading && error && (
          <div className={styles.empty}>{error}</div>
        )}
        
        {/* Empty */}
        {!loading && !error && accounts.length === 0 && (
          <div className={styles.empty}>No accounts found.</div>
        )}
        
        {/* Table */}
        {!loading && !error && accounts.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
              <tr>
                <th>Bank</th>
                <th>Account Name</th>
                <th>Type</th>
                <th>Pending</th>
                <th>Posted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              </thead>
              
              <tbody>
              {accounts.map((account) => {
                const isActive = !account.closingDate;
                
                return (
                  <tr key={account.id}>
                    <td>{account.bankName}</td>
                    
                    <td>{account.name}</td>
                    
                    <td>{account.type}</td>
                    
                    <td>{account.pendingBalance ?? 0}</td>
                    
                    <td>{account.postedBalance ?? 0}</td>
                    
                    <td
                      className={
                        isActive
                          ? styles.statusActive
                          : styles.statusInactive
                      }
                    >
                      {isActive ? "active" : "inactive"}
                    </td>
                    
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.actionButton}
                                onClick={() => showToast("Mock view account", "success")}>
                          View
                        </button>
                        
                        <button className={styles.actionButton}
                                onClick={() => showToast("Mock edit account", "success")}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}