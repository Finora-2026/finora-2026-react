
import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {type TransactionGroupResponseDto, type TransactionResponseDto, transactionGroupService} from "../../utils/transactionGroupService";
import {type BrandResponseDto, brandService} from "../../utils/brandService";
import {type LocationResponseDto, locationService} from "../../utils/locationService";
import {
  type TransactionTypeDto,
  transactionTypeService
} from "../../utils/transactionTypeService";
import {type AccountResponseDto, accountService} from "../../utils/accountService";

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
  const [brands, setBrands] = useState<BrandResponseDto[]>([]);
  const [locations, setLocations] = useState<LocationResponseDto[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDto[]>([]);
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  
  useEffect(() => {
    const loadPostedTransactions = async () => {
      try {
        setLoading(true);
        setError("");
        
        const [
          data,
          brandsData,
          locationsData,
          typesData,
          accountsData
        ] = await Promise.all([
          transactionGroupService.getAvailableReportGroups(),
          brandService.getAllBrands(),
          locationService.getAllLocations(),
          transactionTypeService.getAllTransactionTypes(),
          accountService.getActiveAccounts(),
        ]);
        
        const mapped: TransactionGroup[] = data.map((group: TransactionGroupResponseDto) => ({
          id: group.id,
          transactions: group.transactions.map((tx: TransactionResponseDto) => ({
            id: tx.id,
            date: tx.transactionDate.split("T")[0],
            typeId: tx.transactionTypeId ?? "",
            brandName: tx.brandId ?? "",
            locationName: tx.locationId ?? "",
            amount: tx.amount,
            notes: tx.notes ?? "",
            accountName: tx.accountId,
          })),
        }));
        
        setGroups(mapped);
        
        setBrands(brandsData);
        setLocations(locationsData);
        setTransactionTypes(typesData);
        setAccounts(accountsData);
        
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
  
  const showCurrentReportingTransactions = () => {
    navigate("../../reports/add");
  }
  
  const showRecentReportedTransactions = () => {
    navigate("../../reports/add");
  }
  
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
        <div className={styles.row}>
          <button
            className={styles.button + " " + styles.secondary}
            onClick={showCurrentReportingTransactions}>
            Show current reporting transactions
          </button>
          <button
            className={styles.button + " " + styles.secondary}
            onClick={showRecentReportedTransactions}>
            Show last reported transactions
          </button>
        </div>
        
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
                      <td>
                        {tx.typeId
                          ? transactionTypeMap[tx.typeId] || tx.typeId
                          : "—"}
                      </td>
                      <td>
                        {tx.brandName
                          ? brandMap[tx.brandName] || tx.brandName
                          : "—"}
                      </td>
                      <td>
                        {tx.locationName
                          ? locationMap[tx.locationName] || tx.locationName
                          : "—"}
                      </td>
                      <td className={amountData.className}>
                        {amountData.display}
                      </td>
                      
                      <td>{tx.notes}</td><td>
                        {accountMap[tx.accountName] || tx.accountName}
                      </td>
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