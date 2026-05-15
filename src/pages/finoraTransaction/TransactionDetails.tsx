import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  
  const [loading] = useState(false);
  const [isRepeat] = useState(false);
  const [canEditGroup] = useState(true);
  
  const transactions: Transaction[] = [
    {
      id: "t1",
      date: "2026-01-01",
      typeId: "EXPENSE",
      brandId: "BR1",
      locationId: "LOC1",
      amount: 120.5,
      notes: "Mock transaction 1",
      accountId: "ACC1",
      posted: true,
    },
    {
      id: "t2",
      date: "2026-01-02",
      typeId: "INCOME",
      brandId: "BR2",
      locationId: "LOC2",
      amount: 250,
      notes: "Mock transaction 2",
      accountId: "ACC2",
      posted: false,
    },
  ];
  
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
        
        {/* No transactions */}
        {!loading && transactions.length === 0 && (
          <div className={styles.message}>
            No transactions found in this group.
          </div>
        )}
        
        {/* Table */}
        {!loading && transactions.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "11%" }} />  {/* Date */}
                <col style={{ width: "8%" }} />  {/* Type */}
                <col style={{ width: "8%" }} />  {/* Brand */}
                <col style={{ width: "8%" }} />  {/* Location */}
                <col style={{ width: "8%" }} />  {/* Amount */}
                <col style={{ width: "25%" }} />  {/* Notes (big) */}
                <col style={{ width: "10%" }} />  {/* Account */}
                <col style={{ width: "12%" }} />   {/* Status */}
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