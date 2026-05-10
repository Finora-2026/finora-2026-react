import { useState } from "react";
import styles from "./AccountList.module.scss";

type Mode = "all" | "active" | "inactive";

type Account = {
  id: string;
  bank: string;
  name: string;
  type: string;
  pendingBalance: number;
  postedBalance: number;
  status: "active" | "inactive";
};

export default function AccountList() {
  const [mode, setMode] = useState<Mode>("active");
  
  const accounts: Account[] = [
    {
      id: "1",
      bank: "Chase",
      name: "Checking Account",
      type: "CHECKING",
      pendingBalance: 120.5,
      postedBalance: 100.0,
      status: "active",
    },
    {
      id: "2",
      bank: "Bank of America",
      name: "Savings",
      type: "SAVINGS",
      pendingBalance: 50,
      postedBalance: 200,
      status: "inactive",
    },
  ];
  
  const filteredAccounts = accounts.filter((acc) => {
    if (mode === "all") return true;
    return acc.status === mode;
  });
  
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
        
        {/* Empty state */}
        {filteredAccounts.length === 0 && (
          <div className={styles.empty}>No accounts found.</div>
        )}
        
        {/* Table */}
        {filteredAccounts.length > 0 && (
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
              {filteredAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.bank}</td>
                  <td>{account.name}</td>
                  <td>{account.type}</td>
                  <td>{account.pendingBalance}</td>
                  <td>{account.postedBalance}</td>
                  
                  <td
                    className={
                      account.status === "active"
                        ? styles.statusActive
                        : styles.statusInactive
                    }
                  >
                    {account.status}
                  </td>
                  
                  <td>
                    <div className={styles.actionGroup}>
                      <button className={styles.actionButton}>
                        View
                      </button>
                      <button className={styles.actionButton}>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}