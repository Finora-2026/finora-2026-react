import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { transactionGroupService } from "../../utils/transactionGroupService";

import styles from "./TransactionUpdate.module.scss";

type Transaction = {
  id: string;
  date: string;
  typeId: string;
  brandName: string;
  locationName: string;
  amount: number | null;
  notes: string;
  accountName: string;
};

type TransactionGroup = {
  id: string;
  transactions: Transaction[];
};

export default function TransactionListPosted() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [groups, setGroups] = useState<TransactionGroup[]>([]);
  
  useEffect(() => {
    const loadPostedTransactions = async () => {
      try {
        setLoading(true);
        setError("");
        
        const data =
          await transactionGroupService.getAvailableReportGroups();
        
        const mapped: TransactionGroup[] = data.map((group) => ({
          id: group.id,
          transactions: group.transactions.map((tx) => ({
            id: tx.id,
            date: tx.transactionDate.split("T")[0], // LocalDateTime -> YYYY-MM-DD
            typeId: tx.transactionTypeId ?? "",
            brandName: tx.brandId ?? "",
            locationName: tx.locationId ?? "",
            amount: tx.amount,
            notes: tx.notes ?? "",
            accountName: tx.accountId,
          })),
        }));
        
        setGroups(mapped);
      } catch (error: unknown) {
        console.error(error);
        
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load posted transactions";
        
        setError(message);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPostedTransactions();
  }, []);
  
  const handleGroupClick = (groupId: string) => {
    navigate(`../details/${groupId}`);
  };
  
  const handleRowClick = (groupId: string) => {
    navigate(`../details/${groupId}`);
  };
  
  const getAmountDisplay = (amount: number | null) => {
    if (amount === null) {
      return { display: "—", className: "" };
    }
    
    return amount < 0
      ? {
        display: `-$${Math.abs(amount).toFixed(2)}`,
        className: styles.amountNegative,
      }
      : {
        display: `$${amount.toFixed(2)}`,
        className: styles.amountPositive,
      };
  };
  
  // STATES
  if (loading) {
    return <div className={styles.message}>Loading posted transactions...</div>;
  }
  
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  
  if (!groups.length) {
    return <div className={styles.message}>No posted transactions found.</div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Recent Posted Transactions</h1>
        
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
            {groups.map((group) => (
              <>
                {/* GROUP HEADER ROW */}
                <tr
                  key={group.id}
                  onClick={() => handleGroupClick(group.id)}
                  className={styles.groupRow}
                >
                  <td colSpan={7}>
                    Group id: {group.id} ({group.transactions.length} transactions) - Click for details
                  </td>
                </tr>
                
                {/* TRANSACTION ROWS */}
                {group.transactions.map((tx) => {
                  const amountData = getAmountDisplay(tx.amount);
                  
                  return (
                    <tr
                      key={tx.id}
                      onClick={() => handleRowClick(group.id)}
                      className={styles.clickableRow}
                    >
                      <td>{tx.date}</td>
                      <td>{tx.typeId}</td>
                      <td>{tx.brandName}</td>
                      <td>{tx.locationName}</td>
                      
                      <td className={amountData.className}>
                        {amountData.display}
                      </td>
                      
                      <td>{tx.notes}</td>
                      <td>{tx.accountName}</td>
                    </tr>
                  );
                })}
              </>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}