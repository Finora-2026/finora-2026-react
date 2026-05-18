import {useEffect, useState} from "react";

import { useToast } from "../../components/ToastProvider/toastContext.ts";
import { bankService, type BankResponseDto } from "../../utils/bankService.ts";

import styles from "./TransactionUpdate.module.scss";

type TransactionResult = {
  id: string;
  groupId: string;
  date: string;
  typeName: string;
  brandName: string;
  locationName: string;
  amount: number;
  notes: string;
  bankName: string;
};

export default function TransactionSearch() {
  const { showToast } = useToast();
  
  const [loading] = useState(false);
  const [searched] = useState(true);
  
  const getToday = () => new Date().toISOString().split("T")[0];
  const get30DaysAgo = () => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  };
  const [startDate, setStartDate] = useState<string>(get30DaysAgo());
  const [endDate, setEndDate] = useState<string>(getToday());
  
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  // controls auto-fill behavior
  const [amountAutoFillEnabled, setAmountAutoFillEnabled] = useState(true);
  
  const [banks, setBanks] = useState<BankResponseDto[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [bankError, setBankError] = useState<string | null>(null);
  
  // Fetch banks from BE
  useEffect(() => {
    const loadBanks = async () => {
      setLoadingBanks(true);
      setBankError(null);
      
      try {
        const data = await bankService.getAllBanks();
        setBanks(data);
      } catch (err) {
        console.error("Failed to load banks", err);
        setBanks([]);
        setBankError("Failed to load banks");
        showToast("Failed to load banks", "error");
      } finally {
        setLoadingBanks(false);
      }
    };
    loadBanks();
  }, [showToast]);
  
  // Mock dropdown data
  const brands = [
    { id: "1", name: "Amazon" },
    { id: "2", name: "Walmart" },
  ];
  
  const locations = [
    { id: "1", city: "Dallas", state: "TX" },
    { id: "2", city: "Plano", state: "TX" },
  ];
  
  const transactionTypes = [
    { id: "1", name: "Food" },
    { id: "2", name: "Shopping" },
  ];
  
  // Mock results
  const results: TransactionResult[] = [
    {
      id: "TXN-001",
      groupId: "GRP-001",
      date: "2026-05-18",
      typeName: "Food",
      brandName: "McDonald's",
      locationName: "Dallas, TX",
      amount: -12.45,
      notes: "Lunch",
      bankName: "Chase",
    },
    {
      id: "TXN-002",
      groupId: "GRP-002",
      date: "2026-05-17",
      typeName: "Shopping",
      brandName: "Amazon",
      locationName: "Plano, TX",
      amount: -89.99,
      notes: "Keyboard purchase",
      bankName: "Bank of America",
    },
  ];
  
  // Mock handlers
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search clicked");
  };
  
  const onReset = () => {
    setStartDate(get30DaysAgo());
    setEndDate(getToday());
    
    setMinAmount("");
    setMaxAmount("");
    setAmountAutoFillEnabled(true);
  };
  
  const openTransactionGroup = (groupId: string) => {
    console.log("Open transaction group:", groupId);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Search Transactions
        </h1>
        
        {/* SEARCH FORM */}
        <form className={styles.searchForm} onSubmit={onSearch}>
          <div className={styles.searchGrid}>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Start Date</label>
              <input
                className={styles.input}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>End Date</label>
              <input
                className={styles.input}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Min Amount</label>
              <input
                className={styles.input}
                type="number"
                step="0.01"
                placeholder="-50.00"
                value={minAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  setMinAmount(val);
                  if (!amountAutoFillEnabled) return;
                  if (!val) return;
                  setMaxAmount(val);
                }}
              />
              
              <small className={styles.helpText}>
                Can be negative (e.g. -50.00)
              </small>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Max Amount</label>
              
              <input
                className={styles.input}
                type="number"
                step="0.01"
                placeholder="500.00"
                value={maxAmount}
                onChange={(e) => {
                  setMaxAmount(e.target.value);
                  setAmountAutoFillEnabled(false);
                }}
              />
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Bank</label>
              
              <select className={styles.select} disabled={loadingBanks || !!bankError}>
                <option value="">
                  {loadingBanks
                    ? "Loading banks..."
                    : bankError
                      ? "Unable to load banks"
                      : "-- Select Bank --"}
                </option>
                
                {!loadingBanks &&
                  !bankError &&
                  banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
              </select>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Account</label>
              
              <select className={styles.select}>
                <option value="">-- Select Account --</option>
                
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Brand</label>
              
              <select className={styles.select}>
                <option value="">-- Select Brand --</option>
                
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Location</label>
              
              <select className={styles.select}>
                <option value="">-- Select Location --</option>
                
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.city}, {location.state}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Type</label>
              
              <select className={styles.select}>
                <option value="">-- Select Type --</option>
                
                {transactionTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={`${styles.searchField} ${styles.searchFieldFull}`}>
              <label className={styles.label}>Notes contains</label>
              
              <input
                className={styles.input}
                type="text"
                placeholder="Search notes..."
              />
            </div>
          </div>
          
          <div className={styles.searchActions}>
            <button
              type="submit"
              className={`${styles.searchButton} ${styles.primary}`}
            >
              Search
            </button>
            
            <button
              type="button"
              onClick={onReset}
              className={`${styles.searchButton} ${styles.secondary}`}
            >
              Reset
            </button>
          </div>
        </form>
        
        {/* RESULTS */}
        <div className={styles.resultsSection}>
          
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              Results ({results.length})
            </h2>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className={styles.message}>
              Loading transactions...
            </div>
          )}
          
          {/* No Results */}
          {!loading && searched && results.length === 0 && (
            <div className={styles.message}>
              No transactions found.
            </div>
          )}
          
          {/* Results Table */}
          {!loading && results.length > 0 && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                
                <colgroup>
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                
                <thead>
                <tr>
                  <th>ID</th>
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
                {results.map((transaction) => {
                  
                  const amountClass =
                    transaction.amount < 0
                      ? styles.amountNegative
                      : styles.amountPositive;
                  
                  return (
                    <tr
                      key={transaction.id}
                      onClick={() =>
                        openTransactionGroup(transaction.groupId)
                      }
                      className={styles.clickableRow}
                    >
                      
                      <td data-label="ID">
                        {transaction.id}
                      </td>
                      
                      <td data-label="Date">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      
                      <td data-label="Type">
                        {transaction.typeName || "—"}
                      </td>
                      
                      <td data-label="Brand">
                        {transaction.brandName || "—"}
                      </td>
                      
                      <td data-label="Location">
                        {transaction.locationName || "—"}
                      </td>
                      
                      <td
                        data-label="Amount"
                        className={amountClass}
                      >
                        {transaction.amount < 0
                          ? `-$${Math.abs(transaction.amount).toFixed(2)}`
                          : `$${transaction.amount.toFixed(2)}`}
                      </td>
                      
                      <td data-label="Notes">
                        {transaction.notes || "—"}
                      </td>
                      
                      <td data-label="Bank">
                        {transaction.bankName || "—"}
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
    </div>
  );
}