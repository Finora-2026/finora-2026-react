import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transactionGroupService, type TransactionGroupResponseDto } from "../../utils/transactionGroupService.ts";
import {useToast} from "../../components/ToastProvider/toastContext.ts";
import styles from "./TransactionUpdate.module.scss";

type Transaction = {
  id: string;
  date: string;
  typeId: string;
  brandId: string;
  locationId: string;
  amount: number;
  notes: string;
  accountId: string;
  posted: boolean;
};

export default function TransactionDetails() {
  const { groupId } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [group, setGroup] = useState<TransactionGroupResponseDto | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const isRepeat = group?.isRepeatable ?? false;
  const [canEditGroup] = useState(true);
  
  useEffect(() => {
    if (!groupId) return;
    
    const loadGroup = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await transactionGroupService.getTransactionGroupById(groupId);
        
        setGroup(data);
        setTransactions(
          data.transactions.map((t) => ({
            id: t.id,
            date: t.transactionDate.split("T")[0],
            typeId: t.transactionTypeId ?? "",
            brandId: t.brandId ?? "",
            locationId: t.locationId ?? "",
            amount: t.amount,
            notes: t.notes ?? "",
            accountId: t.accountId,
            posted: t.posted,
          }))
        );
      } catch (error: unknown) {
        console.error(error);
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load transaction group";
        setError(message);
        setGroup(null);
        setTransactions([]);
        showToast("Failed to load transaction group", "error");
      } finally {
        setLoading(false);
      }
    };
    loadGroup();
  }, [groupId, showToast]);
  
  const getBrandName = (id: string) => {
    const map: Record<string, string> = {
      BR1: "Amazon",
      BR2: "Walmart",
    };
    return map[id] ?? id;
  };
  
  const getAccountName = (id: string) => {
    const map: Record<string, string> = {
      ACC1: "Chase Checking",
      ACC2: "BOA Savings",
    };
    return map[id] ?? id;
  };
  
  const getLocationName = (id: string) => {
    const map: Record<string, string> = {
      LOC1: "Dallas, Texas",
      LOC2: "Houston, Texas",
    };
    return map[id] ?? id;
  };
  
  const getAmountClass = (amount: number) => {
    return amount >= 0 ? "text-success" : "text-danger";
  };
  
  const markAsRepeat = (id: string) => {
    showToast(`Mocking mark as repeat this group ${id}`);
  };
  
  const repeatThisGroup = (id: string | undefined) => {
    showToast(`Mocking repeat group ${id}`);
  };
  
  const editThisGroup = (id: string) => {
    showToast(`Mocking editing this group ${id}`);
  }
  
  const editButtonLabel = canEditGroup ? "Edit Group [mocking]" : "View Only [mocking]";
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Transaction Group Id: {groupId}
        </h1>
        
        {/* Loading */}
        {loading && (
          <div className={styles.message}>
            Loading transaction group...
          </div>
        )}
        
        {/* Error */}
        {!loading && error && (
          <div className={styles.message}>
            Error: {error}
          </div>
        )}
        
        {/* No transactions */}
        {!loading && !error && transactions.length === 0 && (
          <div className={styles.message}>
            No transactions found in this group.
          </div>
        )}
        
        {/* Table */}
        {!loading && !error && transactions.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "11%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "12%" }} />
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
                  <th>Status</th>
                </tr>
              </thead>
              
              <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                >
                  <td>{tx.date}</td>
                  <td>{tx.typeId}</td>
                  <td>{getBrandName(tx.brandId)}</td>
                  <td>{getLocationName(tx.locationId)}</td>
                  <td className={getAmountClass(tx.amount)}>
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td style={{ maxWidth: "400px", whiteSpace: "pre-wrap" }}>
                    {tx.notes}
                  </td>
                  <td>{getAccountName(tx.accountId)}</td>
                  <td>
                   <span
                     className={
                       styles.badge +
                       " " +
                       (tx.posted ? styles.badgeSuccess : styles.badgeWarning)
                     }
                   >
                      {tx.posted ? "Posted" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Group actions */}
        <div className={styles.actions}>
          <div className={styles.row}>
            <button
              className={styles.button + " " + styles.primary}
              disabled={!canEditGroup}
              onClick={() => editThisGroup(groupId!)}
            >
              {editButtonLabel}
            </button>
            
            <button
              className={styles.button + " " + styles.primary}
              disabled={isRepeat}
              onClick={() => markAsRepeat(groupId!)}
            >
              {isRepeat ? "Already Marked as Repeat" : "Mark as Repeat"}
            </button>
            
            <button
              className={styles.button + " " + styles.primary}
              onClick={() => repeatThisGroup(groupId)}
            >
              Repeat This Group
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <div className={styles.actions}>
          <div className={styles.row}>
            <button
              className={styles.button + " " + styles.secondary}
              onClick={() => navigate("../list-posted")}
            >
              List all posted transactions
            </button>
            <button
              className={styles.button + " " + styles.secondary}
              onClick={() => navigate("../list-pending")}
            >
              List all pending transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}