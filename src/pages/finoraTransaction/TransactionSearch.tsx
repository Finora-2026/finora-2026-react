import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import { useToast } from "../../components/ToastProvider/toastContext.ts";
import { bankService, type BankResponseDto } from "../../utils/bankService.ts";
import { accountService, type AccountResponseDto,} from "../../utils/accountService.ts";
import {locationService, type LocationResponseDto,} from "../../utils/locationService.ts";
import {brandService, type BrandResponseDto,} from "../../utils/brandService.ts";
import {transactionTypeService, type TransactionTypeDto,} from "../../utils/transactionTypeService.ts";
import transactionService, {type TransactionResponseDto, type TransactionSearchRequestDto}
  from "../../utils/transactionService.ts";

import styles from "./TransactionUpdate.module.scss";

export default function TransactionSearch() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  
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
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [bankError, setBankError] = useState<string | null>(null);
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  
  const [locations, setLocations] = useState<LocationResponseDto[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  
  const [brands, setBrands] = useState<BrandResponseDto[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [brandError, setBrandError] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDto[]>([]);
  const [loadingTransactionTypes, setLoadingTransactionTypes] = useState(false);
  const [transactionTypeError, setTransactionTypeError] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState("");
  
  const [notes, setNotes] = useState("");
  
  const [results, setResults] = useState<TransactionResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
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
  
  // Fetch accounts from BE
  useEffect(() => {
    const loadAccounts = async () => {
      setLoadingAccounts(true);
      setAccountError(null);
      try {
        const data = selectedBankId
          ? await accountService.getAccountsByBank(selectedBankId)
          : await accountService.getAllAccounts();
        setAccounts(data);
      } catch (err) {
        console.error("Failed to load accounts", err);
        setAccounts([]);
        setAccountError("Failed to load accounts");
        showToast("Failed to load accounts", "error");
      } finally {
        setLoadingAccounts(false);
      }
    };
    loadAccounts();
  }, [selectedBankId, showToast]);
  
  // Fetch location from BE
  useEffect(() => {
    const loadLocations = async () => {
      setLoadingLocations(true);
      setLocationError(null);
      try {
        const data = await locationService.getAllLocations();
        setLocations(data);
      } catch (err) {
        console.error("Failed to load locations", err);
        setLocations([]);
        setLocationError("Failed to load locations");
        showToast("Failed to load locations", "error");
      } finally {
        setLoadingLocations(false);
      }
    };
    loadLocations();
  }, [showToast]);
  
  // Load brands from BE
  useEffect(() => {
    const loadBrands = async () => {
      setLoadingBrands(true);
      setBrandError(null);
      try {
        const data = await brandService.getAllBrands();
        setBrands(data);
      } catch (err) {
        console.error("Failed to load brands", err);
        setBrands([]);
        setBrandError("Failed to load brands");
        showToast("Failed to load brands", "error");
      } finally {
        setLoadingBrands(false);
      }
    };
    loadBrands();
  }, [showToast]);
  
  // Load transaction types from BE
  useEffect(() => {
    const loadTransactionTypes = async () => {
      setLoadingTransactionTypes(true);
      setTransactionTypeError(null);
      try {
        const data = await transactionTypeService.getAllTransactionTypes();
        setTransactionTypes(data);
      } catch (err) {
        console.error("Failed to load transaction types", err);
        setTransactionTypes([]);
        setTransactionTypeError("Failed to load transaction types");
        showToast("Failed to load transaction types", "error");
      } finally {
        setLoadingTransactionTypes(false);
      }
    };
    loadTransactionTypes();
  }, [showToast]);
  
  const accountMap = useMemo(
    () => Object.fromEntries(accounts.map(a => [a.id, a.name])),
    [accounts]
  );
  
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
  
  const typeMap = useMemo(
    () => Object.fromEntries(transactionTypes.map(t => [t.id, t.name])),
    [transactionTypes]
  );
  
  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setSearched(true);
    
    try {
      const request: TransactionSearchRequestDto = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        
        minAmount: minAmount ? Number(minAmount) : undefined,
        maxAmount: maxAmount ? Number(maxAmount) : undefined,
        
        bankId: selectedBankId || undefined,
        accountId: selectedAccountId || undefined,
        brandId: selectedBrandId || undefined,
        locationId: selectedLocationId || undefined,
        typeId: selectedTypeId || undefined,
        
        notes: notes || undefined,
      };
      
      const data = await transactionService.searchTransactions(request);
      setResults(data);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to search transactions";
      showToast(message, "error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  const onReset = () => {
    setStartDate(get30DaysAgo());
    setEndDate(getToday());
    
    setMinAmount("");
    setMaxAmount("");
    setAmountAutoFillEnabled(true);
    
    setSelectedBankId("");
    setSelectedAccountId("");
    
    setSelectedBrandId("");
    setSelectedLocationId("");
    setSelectedTypeId("");
    
    setNotes("");
  };
  
  const openTransactionGroup = (groupId: string) => {
    navigate(`../details/${groupId}`);
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
              
              <select
                className={styles.select}
                value={selectedBankId}
                onChange={(e) => {
                  setSelectedBankId(e.target.value);
                  setSelectedAccountId("");
                }}
                disabled={loadingBanks || !!bankError}
              >
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
              
              <select
                className={styles.select}
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                disabled={loadingAccounts || !!accountError}
              >
                <option value="">
                  {loadingAccounts
                    ? "Loading accounts..."
                    : accountError
                      ? "Unable to load accounts"
                      : "-- Select Account --"}
                </option>
                
                {!loadingAccounts &&
                  !accountError &&
                  accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
              </select>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Brand</label>
              <select
                className={styles.select}
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
                disabled={loadingBrands || !!brandError}
              >
                <option value="">
                  {loadingBrands
                    ? "Loading brands..."
                    : brandError
                      ? "Unable to load brands"
                      : "-- Select Brand --"}
                </option>
                
                {!loadingBrands &&
                  !brandError &&
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Location</label>
              
              <select
                className={styles.select}
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                disabled={loadingLocations || !!locationError}
              >
                <option value="">
                  {loadingLocations
                    ? "Loading locations..."
                    : locationError
                      ? "Unable to load locations"
                      : "-- Select Location --"}
                </option>
                
                {!loadingLocations &&
                  !locationError &&
                  locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}, {location.state}
                    </option>
                  ))}
              </select>
            </div>
            
            <div className={styles.searchField}>
              <label className={styles.label}>Type</label>
              
              <select
                className={styles.select}
                value={selectedTypeId}
                onChange={(e) => setSelectedTypeId(e.target.value)}
                disabled={loadingTransactionTypes || !!transactionTypeError}
              >
                <option value="">
                  {loadingTransactionTypes
                    ? "Loading types..."
                    : transactionTypeError
                      ? "Unable to load types"
                      : "-- Select Type --"}
                </option>
                
                {!loadingTransactionTypes &&
                  !transactionTypeError &&
                  transactionTypes.map((type) => (
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
          {searched && !loading && results.length === 0 && (
            <div className={styles.message}>
              No transactions found.
            </div>
          )}
          
          {/* Not search yet */}
          {!searched && !loading && (
            <div className={styles.message}>
              Use filters and click Search to begin.
            </div>
          )}
          
          {/* Results Table */}
          {!loading && results.length > 0 && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                
                <colgroup>
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
                      onClick={() => openTransactionGroup(transaction.transactionGroupId)}
                      className={styles.clickableRow}
                    >
                      <td data-label="Date">
                        {new Date(transaction.transactionDate).toLocaleDateString()}
                      </td>
                      
                      <td data-label="Type">
                        {transaction.transactionTypeId
                          ? typeMap[transaction.transactionTypeId] || "—"
                          : "—"}
                      </td>
                      
                      <td data-label="Brand">
                        {transaction.brandId
                          ? brandMap[transaction.brandId] || "—"
                          : "—"}
                      </td>
                      
                      <td data-label="Location">
                        {transaction.locationId
                          ? locationMap[transaction.locationId] || "—"
                          : "—"}
                      </td>
                      
                      <td data-label="Amount" className={amountClass}>
                        {transaction.amount < 0
                          ? `-$${Math.abs(transaction.amount).toFixed(2)}`
                          : `$${transaction.amount.toFixed(2)}`}
                      </td>
                      
                      <td data-label="Notes">
                        {transaction.notes || "—"}
                      </td>
                      
                      <td data-label="Bank">
                        {transaction.accountId
                          ? accountMap[transaction.accountId] || "—"
                          : "—"}
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