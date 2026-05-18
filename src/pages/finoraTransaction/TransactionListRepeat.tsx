import { useEffect, useState } from "react";
import styles from "./TransactionUpdate.module.scss";

type TransactionDto = {
  id: string;
  date: string;
  typeId: string;
  brandName: string;
  locationName: string;
  amount: number;
  notes?: string;
  bankName: string;
};

type TransactionGroupDto = {
  id: string;
  transactions: TransactionDto[];
};

// ----------------------------
// MOCK DATA
// ----------------------------
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
        bankName: "Chase",
      },
      {
        id: "T2",
        date: "2026-06-01",
        typeId: "EXPENSE",
        brandName: "Netflix",
        locationName: "Online",
        amount: -15.99,
        notes: "Monthly subscription",
        bankName: "Chase",
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
        bankName: "Bank of America",
      },
    ],
  },
];

export default function TransactionListRepeat() {
  const [loading, setLoading] = useState(true);
  const [transactionGroups, setTransactionGroups] = useState<TransactionGroupDto[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactionGroups(mockGroups);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getAmountClass = (amount: number) =>
    amount < 0 ? styles.amountNegative : styles.amountPositive;
  
  const getAmountDisplay = (amount: number) =>
    amount < 0
      ? `-$${Math.abs(amount).toFixed(2)}`
      : `+$${amount.toFixed(2)}`;
  
  const repeatGroup = (groupId: string) => {
    console.log("repeat", groupId);
  };
  
  const removeRepeatTag = (groupId: string) => {
    console.log("remove repeat", groupId);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Repeat Transactions</h2>
        
        {loading && (
          <div className={styles.message}>
            Loading repeat transactions...
          </div>
        )}
        
        {!loading && transactionGroups.length === 0 && (
          <div className={styles.message}>
            No repeat transactions found.
          </div>
        )}
        
        {!loading && transactionGroups.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Notes</th>
                <th>Bank</th>
              </tr>
              </thead>
              
              <tbody>
              {transactionGroups.map((group) => (
                <>
                  {/* GROUP HEADER */}
                  <tr key={group.id} className={styles.groupRow}>
                    <td colSpan={7}>
                      <div className={styles.inline} style={{ justifyContent: "space-between", width: "100%" }}>
                        <div>
                          Group: {group.id}{" "}
                          <span className={styles.badge}>
                              {group.transactions.length} tx
                            </span>
                        </div>
                        
                        <div className={styles.inline}>
                          <button
                            className={`${styles.button} ${styles.primary}`}
                            onClick={() => repeatGroup(group.id)}
                          >
                            Repeat
                          </button>
                          
                          <button
                            className={`${styles.button} ${styles.danger}`}
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
                      <td>{tx.bankName}</td>
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