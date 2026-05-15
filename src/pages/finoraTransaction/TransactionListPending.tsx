import {useEffect, useState} from "react";
import { useToast } from "../../components/ToastProvider/toastContext.ts";
import transactionService, {
  type TransactionResponseDto
} from "../../utils/transactionService.ts";

import styles from "./TransactionUpdate.module.scss";

export default function TransactionListPending() {
  
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState<boolean>(true);
  
  const [results, setResults] = useState<TransactionResponseDto[]>([]);
  
  // Show an instruction when first loading
  useEffect(() => {
    showToast("Click on each transaction to see the details");
  }, [showToast]);
  
  // Load pending transactions
  useEffect(() => {
    const loadPendingTransactions = async () => {
      try {
        setLoading(true);
        const data = await transactionService.getPendingTransactions();
        setResults(data);
      } catch (error) {
        console.error(error);
        showToast("Failed to load pending transactions");
      } finally {
        setLoading(false);
      }
    };
    loadPendingTransactions();
  }, [showToast]);
  
  const openTransactionGroup = (groupId: string) => {
    showToast(`Mock open transaction group: ${groupId}`);
  };
  
  const getAmountDisplay = (amount: number) => {
    if (amount < 0) {
      return {
        display: `-$${Math.abs(amount).toFixed(2)}`,
        className: styles.amountNegative
      };
    }
    return {
      display: `$${amount.toFixed(2)}`,
      className: styles.amountPositive
    };
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Pending Transactions</h1>
        
        {/* Loading state */}
        {loading && <div className={styles.message}>Loading pending transactions...</div>}
        
        {/* Empty state */}
        {!loading && results.length === 0 && (
          <div className={styles.message}>No pending transactions found.</div>
        )}
        
        {/* Table state */}
        {!loading && results.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "11%" }} /> {/* Date */}
                <col style={{ width: "9%" }} />  {/* Type */}
                <col style={{ width: "10%" }} /> {/* Brand */}
                <col style={{ width: "10%" }} /> {/* Location */}
                <col style={{ width: "10%" }} /> {/* Amount */}
                <col style={{ width: "35%" }} /> {/* Notes (Given maximum real estate) */}
                <col style={{ width: "15%" }} /> {/* Account */}
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
              {results.map((tx) => {
                const amountData = getAmountDisplay(tx.amount);
                const isClickable = !!tx.transactionGroupId;
                
                return (
                  <tr
                    key={tx.id}
                    onClick={() => isClickable ? openTransactionGroup(tx.transactionGroupId) : null}
                    className={isClickable ? styles.clickableRow : ""}
                  >
                    
                    <td data-label="Date">
                      {new Date(tx.transactionDate).toLocaleDateString()}
                    </td>
                    <td data-label="Type">
                      {tx.transactionTypeId || "—"}
                    </td>
                    <td data-label="Brand">
                      {tx.brandId || "—"}
                    </td>
                    <td data-label="Location">
                      {tx.locationId || "—"}
                    </td>
                    <td data-label="Amount" className={amountData.className}
                    >
                      {amountData.display}
                    </td>
                    <td data-label="Notes">
                      {tx.notes || "—"}
                    </td>
                    <td data-label="Account">
                      {tx.accountId}
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