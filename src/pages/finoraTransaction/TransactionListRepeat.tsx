import { useEffect, useState } from "react";

import {useToast} from "../../components/ToastProvider/toastContext.ts";

import styles from "./TransactionUpdate.module.scss";

type TransactionDto = {
  id: string;
  date: string;
  typeId: string;
  brandName: string;
  locationName: string;
  amount: number;
  notes?: string;
  accountName: string;
};

type TransactionGroupDto = {
  id: string;
  transactions: TransactionDto[];
};

// MOCK DATA
const mockGroups: TransactionGroupDto[] = [
  {
    id: "GRP-1001",
    transactions: [
      {
        id: "T1",
        date: "2026-05-01",
        typeId: "EXPENSE",
        brandName: "Netflix",
        locationName: "Online",
        amount: -15.99,
        notes: "Monthly subscription",
        accountName: "CHASE_001",
      },
      {
        id: "T2",
        date: "2026-06-01",
        typeId: "EXPENSE",
        brandName: "Netflix",
        locationName: "Online",
        amount: -15.99,
        notes: "Monthly subscription",
        accountName: "CHASE_001",
      },
    ],
  },
  {
    id: "GRP-1002",
    transactions: [
      {
        id: "T3",
        date: "2026-05-10",
        typeId: "EXPENSE",
        brandName: "Spotify",
        locationName: "Online",
        amount: -9.99,
        notes: "Family plan",
        accountName: "BOA_002",
      },
    ],
  },
];

export default function TransactionListRepeat() {
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [transactionGroups, setTransactionGroups] = useState<TransactionGroupDto[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactionGroups(mockGroups);
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getAmountClass = (amount: number) =>
    amount < 0 ? styles.amountNegative : styles.amountPositive;
  
  const getAmountDisplay = (amount: number) =>
    amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `$${amount.toFixed(2)}`;
  
  const repeatGroup = (groupId: string) => {
    showToast(`Mock repeating this group: ${groupId}`);
  };
  
  const removeRepeatTag = (groupId: string) => {
    showToast(`Mock remove repeating tag for this group: ${groupId}`);
  };
  
  const showDetails = (groupId: string) => {
    showToast(`Mock show details for this group: ${groupId}`);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Repeat Transactions</h2>
        
        {loading && <div className={styles.message}>Loading repeat transactions...</div>}
        
        {!loading && transactionGroups.length === 0 && (
          <div className={styles.message}>No repeat transactions found.</div>
        )}
        
        {!loading && transactionGroups.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "11%" }} />
                <col style={{ width: "9%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "35%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              
              <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Notes</th>
                <th>Account</th>
              </tr>
              </thead>
              
              <tbody>
              {transactionGroups.map((group) => (
                <>
                  {/* GROUP HEADER */}
                  <tr key={group.id} className={styles.groupRowNoPointer}>
                    <td colSpan={7}>
                      <div className={styles.inline} style={{ justifyContent: "space-between", width: "100%" }}>
                        <div>
                          Group id: {group.id} ({group.transactions.length} transactions)
                        </div>
                        
                        <div className={styles.repeatButtonGroup}>
                          <button
                            className={`${styles.button} ${styles.repeatButton} ${styles.repeatPrimary}`}
                            onClick={() => repeatGroup(group.id)}
                          >
                            Repeat
                          </button>
                          <button
                            className={`${styles.button} ${styles.repeatButton} ${styles.repeatSecondary}`}
                            onClick={() => showDetails(group.id)}
                          >
                            Details
                          </button>
                          <button
                            className={`${styles.button} ${styles.repeatButton} ${styles.repeatDanger}`}
                            onClick={() => removeRepeatTag(group.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* TRANSACTIONS */}
                  {group.transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.date}</td>
                      <td>{tx.typeId}</td>
                      <td>{tx.brandName}</td>
                      <td>{tx.locationName}</td>
                      <td className={getAmountClass(tx.amount)}>
                        {getAmountDisplay(tx.amount)}
                      </td>
                      <td>{tx.notes}</td>
                      <td>{tx.accountName}</td>
                    </tr>
                  ))}
                </>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}