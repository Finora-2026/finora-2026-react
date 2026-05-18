import { useEffect, useState } from "react";
import { useMemo } from "react";
import {useToast} from "../../components/ToastProvider/toastContext.ts";

import { brandService, type BrandResponseDto } from "../../utils/brandService";
import { locationService, type LocationResponseDto } from "../../utils/locationService";
import {transactionTypeService, type TransactionTypeDto } from "../../utils/transactionTypeService";
import { accountService, type AccountResponseDto } from "../../utils/accountService";
import { transactionGroupService } from "../../utils/transactionGroupService";
import {type TransactionGroupResponseDto, type TransactionResponseDto,} from "../../utils/transactionGroupService";

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

export default function TransactionListRepeat() {
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  const [transactionGroups, setTransactionGroups] = useState<TransactionGroupDto[]>([]);
  const [brands, setBrands] = useState<BrandResponseDto[]>([]);
  const [locations, setLocations] = useState<LocationResponseDto[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDto[]>([]);
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  
  // Fetch all data from BE
  useEffect(() => {
    const loadGroupsAndData = async () => {
      try {
        setLoading(true);
        setError("");
        const [
          data,
          brandsData,
          locationsData,
          typesData,
          accountsData,
        ] = await Promise.all([
          transactionGroupService.getRepeatableGroups(),
          brandService.getAllBrands(),
          locationService.getAllLocations(),
          transactionTypeService.getAllTransactionTypes(),
          accountService.getAllAccounts(),
        ]);
        const mapped: TransactionGroupDto[] = data.map(
          (group: TransactionGroupResponseDto) => ({
            id: group.id,
            transactions: group.transactions.map(
              (tx: TransactionResponseDto) => ({
                id: tx.id,
                date: tx.transactionDate.split("T")[0],
                typeId: tx.transactionTypeId ?? "",
                brandName: tx.brandId ?? "",
                locationName: tx.locationId ?? "",
                amount: tx.amount,
                notes: tx.notes ?? "",
                accountName: tx.accountId,
              })
            ),
          })
        );
        setTransactionGroups(mapped);
        setBrands(brandsData);
        setLocations(locationsData);
        setTransactionTypes(typesData);
        setAccounts(accountsData);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load repeatable groups and data from BE";
        setError(message);
        setTransactionGroups([]);
        showToast(message, "error");
      } finally {
        setLoading(false);
      }
    };
    loadGroupsAndData();
  }, [showToast]);
  
  const brandMap = useMemo(
    () => Object.fromEntries(brands.map(b => [b.id, b.name])),
    [brands]
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
  
  const accountMap = useMemo(
    () => Object.fromEntries(accounts.map(a => [a.id, a.name])),
    [accounts]
  );
  
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
        
        {/*Pending states*/}
        {loading && <div className={styles.message}>Loading repeat transactions...</div>}
        {error && <div className={styles.error}>{error}</div>}
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
                      <td>
                        {tx.typeId ? transactionTypeMap[tx.typeId] || tx.typeId : "—"}
                      </td>
                      <td>
                        {tx.brandName ? brandMap[tx.brandName] || tx.brandName : "—"}
                      </td>
                      <td>
                        {tx.locationName ? locationMap[tx.locationName] || tx.locationName : "—"}
                      </td>
                      <td className={getAmountClass(tx.amount)}>
                        {getAmountDisplay(tx.amount)}
                      </td>
                      <td>{tx.notes}</td>
                      <td>
                        {accountMap[tx.accountName] || tx.accountName}
                      </td>
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