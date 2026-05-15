import { useState } from "react";
import {useToast} from "../../components/ToastProvider/toastContext.ts";

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
  bankName?: string;
}

export default function TransactionListPending() {
  
  const { showToast } = useToast();
  
  // Mock States (Wire useEffect API call here later)
  const [loading, setLoading] = useState<boolean>(false);
  
  // Mocking 1 transaction record based on DTO structure
  const [results, setResults] = useState<TransactionResponseDto[]>([
    {
      id: "tx_123",
      transactionGroupId: "group_abc",
      transactionDate: "2026-05-15T14:30:00",
      amount: -45.50,
      notes: "Weekly grocery run",
      accountId: "acc_99",
      brandId: "brand_target",
      brandName: "Target",        // Fallback placeholder
      locationId: "loc_rowlett",
      locationName: "Rowlett",    // Fallback placeholder
      transactionTypeId: "Expense",
      bankName: "Chase Bank",     // Fallback placeholder
      isPosted: false
    }
  ]);
  
  // Mock Handlers
  const openTransactionGroup = (groupId: string) => {
    showToast(`Mock open transaction group: ${groupId}`);
  };
  
  const getAmountDisplay = (amount: number) => {
    if (amount < 0) {
      return { display: `-$${Math.abs(amount).toFixed(2)}`, classes: "negative-amount" };
    }
    return { display: `$${amount.toFixed(2)}`, classes: "positive-amount" };
  };
  
  return (
    <div>
      <h2>Pending Transactions</h2>
      
      {/* Loading state (*ngIf="loading") */}
      {loading && (
        <div>
          <i>[Icon: Hourglass]</i>
          <div>Loading pending transactions...</div>
        </div>
      )}
      
      {/* Empty state (*ngIf="!loading && results.length === 0") */}
      {!loading && results.length === 0 && (
        <div>
          <i>[Icon: Clock History]</i>
          <div>No pending transactions found.</div>
        </div>
      )}
      
      {/* Table state (*ngIf="results.length > 0") */}
      {!loading && results.length > 0 && (
        <div>
          <table>
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
            {results.map((tx) => {
              const amountData = getAmountDisplay(tx.amount);
              
              return (
                <tr
                  key={tx.id}
                  onClick={() => tx.transactionGroupId ? openTransactionGroup(tx.transactionGroupId) : null}
                  style={{ cursor: tx.transactionGroupId ? 'pointer' : 'default' }}
                >
                  {/* Date */}
                  <td>{new Date(tx.transactionDate).toLocaleDateString()}</td>
                  
                  {/* Type */}
                  <td>
                    <span>{tx.transactionTypeId}</span>
                  </td>
                  
                  {/* Brand */}
                  <td>{tx.brandName || tx.brandId || '—'}</td>
                  
                  {/* Location */}
                  <td>{tx.locationName || tx.locationId || '—'}</td>
                  
                  {/* Amount */}
                  <td className={amountData.classes}>
                    {amountData.display}
                  </td>
                  
                  {/* Notes */}
                  <td>{tx.notes}</td>
                  
                  {/* Bank / Account */}
                  <td>{tx.bankName || tx.accountId}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}