import {useEffect, useMemo, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  transactionGroupService,
  type TransactionGroupResponseDto
} from "../../utils/transactionGroupService.ts";
import {
  brandService,
  type BrandResponseDto,
} from "../../utils/brandService.ts";

import {
  locationService,
  type LocationResponseDto,
} from "../../utils/locationService.ts";

import {
  transactionTypeService,
  type TransactionTypeDto,
} from "../../utils/transactionTypeService.ts";

import {
  accountService,
  type AccountResponseDto,
} from "../../utils/accountService.ts";
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
  
  const [brands, setBrands] = useState<BrandResponseDto[]>([]);
  const [locations, setLocations] = useState<LocationResponseDto[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDto[]>([]);
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  
  const isRepeat = group?.repeatable ?? false;
  const reportId = group?.reportId;
  const isLockedByReport = !!group?.reportId;
  
  // Load all data
  useEffect(() => {
    if (!groupId) return;
    
    const loadGroup = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [groupData, brandsData, locationsData, transactionTypesData, accountsData] =
          await Promise.all([
            transactionGroupService.getTransactionGroupById(groupId),
            brandService.getAllBrands(),
            locationService.getAllLocations(),
            transactionTypeService.getAllTransactionTypes(),
            accountService.getActiveAccounts(),
          ]);
        
        setGroup(groupData);
        setBrands(brandsData);
        setLocations(locationsData);
        setTransactionTypes(transactionTypesData);
        setAccounts(accountsData);
        
        setTransactions(
          groupData.transactions.map((t) => ({
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
  
  const brandMap = useMemo(
    () => Object.fromEntries(brands.map(b => [b.id, b.name])),
    [brands]
  );
  
  const accountMap = useMemo(
    () => Object.fromEntries(accounts.map(a => [a.id, a.name])),
    [accounts]
  );
  
  const locationMap = useMemo(
    () =>
      Object.fromEntries(
        locations.map(l => [l.id, `${l.city}, ${l.state}`])
      ),
    [locations]
  );
  
  const transactionTypeMap = useMemo(
    () => Object.fromEntries(transactionTypes.map(t => [t.id, t.name])),
    [transactionTypes]
  );
  
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
    if (isLockedByReport) {
      showToast("Cannot edit: group is part of a report", "error");
      return;
    }
    navigate(`../update/${id}`);
  };
  
  const goToReport = (reportId?: string | null) => {
    if (!reportId) return;
    showToast(`Mocking report navigation to this reportId ${reportId}`);
  };
  
  const editButtonLabel = isLockedByReport ? "View Only" : "Edit this Group";
  
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
                  <td>
                    {tx.typeId
                      ? transactionTypeMap[tx.typeId] ?? tx.typeId
                      : "—"}
                  </td>
                  <td>
                    {tx.brandId
                      ? brandMap[tx.brandId] ?? tx.brandId
                      : "—"}
                  </td>
                  <td>
                    {tx.locationId
                      ? locationMap[tx.locationId] ?? tx.locationId
                      : "—"}
                  </td>
                  
                  <td className={getAmountClass(tx.amount)}>
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td style={{ maxWidth: "400px", whiteSpace: "pre-wrap" }}>
                    {tx.notes}
                  </td>
                  <td>
                    {accountMap[tx.accountId] ?? tx.accountId}
                  </td>
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
              disabled={isLockedByReport}
              onClick={() => groupId && editThisGroup(groupId)}
            >
              {editButtonLabel}
            </button>
            
            <button
              className={styles.button + " " + styles.primary}
              disabled={isRepeat}
              onClick={() => markAsRepeat(groupId!)}
            >
              {isRepeat ? "Already Marked as Repeatable" : "Mark as Repeatable"}
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
            <button
              className={styles.button + " " + styles.secondary}
              disabled={!reportId}
              onClick={() => goToReport(reportId)}
            >
              {reportId ? `Go to Report ${reportId}` : "Not Added to Report Yet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}