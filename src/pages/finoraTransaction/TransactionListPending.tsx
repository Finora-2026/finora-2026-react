import {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ToastProvider/toastContext.ts";

import transactionService, {
  type TransactionResponseDto
} from "../../utils/transactionService.ts";
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

import styles from "./TransactionUpdate.module.scss";

export default function TransactionListPending() {
  
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<TransactionResponseDto[]>([]);
  const [brands, setBrands] = useState<BrandResponseDto[]>([]);
  const [locations, setLocations] = useState<LocationResponseDto[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDto[]>([]);
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  
  // Show an instruction when first loading
  useEffect(() => {
    showToast("Click on each transaction to see the details");
  }, [showToast]);
  
  // Load all lookup data and pending transactions
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [
          transactions,
          brandsData,
          locationsData,
          transactionTypesData,
          accountsData
        ] = await Promise.all([
          transactionService.getPendingTransactions(),
          brandService.getAllBrands(),
          locationService.getAllLocations(),
          transactionTypeService.getAllTransactionTypes(),
          accountService.getActiveAccounts(),
        ]);
        setResults(transactions);
        setBrands(brandsData);
        setLocations(locationsData);
        setTransactionTypes(transactionTypesData);
        setAccounts(accountsData);
      } catch (error: unknown) {
        console.error(error);
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load pending transactions";
        setError(message);
        setResults([]);
        showToast(message, "error");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [showToast]);
  
  // Fast lookup maps
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
  
  const openTransactionGroup = (groupId: string) => {
    navigate(`../details/${groupId}`);
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
        {loading && (
          <div className={styles.message}>
            Loading pending transactions...
          </div>
        )}
        
        {/* Error */}
        {!loading && error && (
          <div className={styles.message}>
            Error: {error}
          </div>
        )}
        
        {/* Empty state */}
        {!loading && !error && results.length === 0 && (
          <div className={styles.message}>
            No pending transactions found.
          </div>
        )}
        
        {/* Table */}
        {!loading && !error && results.length > 0 && (
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
                      {tx.transactionTypeId
                        ? transactionTypeMap[tx.transactionTypeId] || tx.transactionTypeId
                        : "—"}
                    </td>
                    <td data-label="Brand">
                      {tx.brandId
                        ? brandMap[tx.brandId] || tx.brandId
                        : "—"}
                    </td>
                    <td data-label="Location">
                      {tx.locationId
                        ? locationMap[tx.locationId] || tx.locationId
                        : "—"}
                    </td>
                    <td data-label="Amount" className={amountData.className}
                    >
                      {amountData.display}
                    </td>
                    <td data-label="Notes">
                      {tx.notes || "—"}
                    </td>
                    <td data-label="Account">
                      {accountMap[tx.accountId] || tx.accountId}
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