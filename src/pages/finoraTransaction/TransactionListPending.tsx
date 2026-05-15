import {useEffect, useState} from "react";
import { useToast } from "../../components/ToastProvider/toastContext.ts";
import styles from "./TransactionUpdate.module.scss"; // Reusing your existing SCSS file

// Define the TypeScript interface matching backend TransactionResponseDto
interface TransactionResponseDto {
  id: string;
  transactionGroupId: string;
  transactionDate: string; // LocalDateTime serializes as string ISO
  amount: number;
  notes: string;
  accountId: string;
  brandId: string | null;
  locationId: string | null;
  transactionTypeId: string;
  isPosted: boolean;
  
  // Note: Added missing string placeholders for UI display since DTO only had IDs
  brandName?: string;
  locationName?: string;
  transactionTypeName?: string;
  accountName: string;
}

export default function TransactionListPending() {
  
  const { showToast } = useToast();
  
  // Mock States (Wire useEffect API call here later)
  // const [loading, setLoading] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);
  
  // Mocking 1 transaction record based on DTO structure
  // const [results, setResults] = useState<TransactionResponseDto[]>([
  //   {
  //     id: "tx_123",
  //     transactionGroupId: "group_abc",
  //     transactionDate: "2026-05-15T14:30:00",
  //     amount: -45.50,
  //     notes: "Weekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery run",
  //     accountId: "acc_99",
  //     accountName: "BOA Checking 1",
  //     brandId: "brand_target",
  //     brandName: "Target",
  //     locationId: "loc_rowlett",
  //     locationName: "Rowlett",
  //     transactionTypeId: "qwert",
  //     transactionTypeName: "INCOME",
  //     isPosted: false
  //   }
  // ]);
  const [results] = useState<TransactionResponseDto[]>([
    {
      id: "tx_123",
      transactionGroupId: "group_abc",
      transactionDate: "2026-05-15T14:30:00",
      amount: -45.50,
      notes: "Weekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery runWeekly grocery run",
      accountId: "acc_99",
      accountName: "BOA Checking 1",
      brandId: "brand_target",
      brandName: "Target",
      locationId: "loc_rowlett",
      locationName: "Rowlett",
      transactionTypeId: "qwert",
      transactionTypeName: "INCOME",
      isPosted: false
    }
  ]);
  
  // Show an instruction when first loading
  useEffect(() => {
    showToast("Click on each transaction to see the details");
  }, [showToast]);
  
  // Mock Handlers
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
                    {/* Responsive Labels added with data-label for your mobile CSS breakpoint */}
                    <td data-label="Date">{new Date(tx.transactionDate).toLocaleDateString()}</td>
                    <td data-label="Type">{tx.transactionTypeName || tx.transactionTypeId}</td>
                    <td data-label="Brand">{tx.brandName || tx.brandId || '—'}</td>
                    <td data-label="Location">{tx.locationName || tx.locationId || '—'}</td>
                    <td data-label="Amount" className={amountData.className}>
                      {amountData.display}
                    </td>
                    <td data-label="Notes">{tx.notes}</td>
                    <td data-label="Bank">{tx.accountName || tx.accountId}</td>
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