import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useToast} from "../../components/ToastProvider/toastContext.ts";
import styles from "./TransactionUpdate.module.scss";
import {
  accountService,
  type AccountResponseDto,
} from "../../utils/accountService.ts";
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
  type TransactionGroupResponseDto,
  transactionGroupService,
} from "../../utils/transactionGroupService.ts";
import {useNavigate} from "react-router-dom";

type Transaction = {
  id: string;
  date: string;
  transactionTypeId: string;
  brandId: string;
  locationId: string;
  amount: string;
  notes: string;
  accountId: string;
  posted: boolean;
};

type PageMode = "create" | "edit" | "repeat";

export default function TransactionUpdate() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { groupId } = useParams();
  const mode: PageMode =
    location.pathname.includes("/update/")
      ? "edit"
      : location.pathname.includes("/repeat/")
        ? "repeat"
        : "create";
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [group, setGroup] = useState<TransactionGroupResponseDto | null>(null);
  
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState("");
  
  const [brands, setBrands] = useState<BrandResponseDto[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [brandsError, setBrandsError] = useState("");
  
  const [locations, setLocations] = useState<LocationResponseDto[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [locationsError, setLocationsError] = useState("");
  
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDto[]>([]);
  const [transactionTypesLoading, setTransactionTypesLoading] = useState(true);
  const [transactionTypesError, setTransactionTypesError] = useState("");
  
  const [dateValidationMap, setDateValidationMap] = useState<
    Record<string, boolean | null>
  >({});
  
  const getToday = () => new Date().toISOString().split("T")[0];
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "t1",
      date: getToday(),
      transactionTypeId: "",
      brandId: "",
      locationId: "",
      amount: "",
      notes: "",
      accountId: "",
      posted: false,
    },
  ]);
  
  const [showCashbackInput, setShowCashbackInput] = useState(false);
  const [cashbackPercent, setCashbackPercent] = useState<number>(0);
  
  const [showSplitFirstInput, setShowSplitFirstInput] = useState(false);
  const [splitFirstCount, setSplitFirstCount] = useState<number>(2);
  
  const [showSplitAllInput, setShowSplitAllInput] = useState(false);
  const [splitAllCount, setSplitAllCount] = useState<number>(2);
  
  const hasInvalidDate = transactions.some((t) => {
    const valid = dateValidationMap[t.id];
    return valid === false;
  });
  
  const isInvalid =
    hasInvalidDate ||
    transactions.some((t) => {
      const amount = Number(t.amount);
      return (
        !t.date ||
        !t.accountId ||
        t.amount === "" ||
        Number.isNaN(amount) ||
        amount === 0
      );
    });
  
  const pageTitleMap: Record<PageMode, string> = {
    create: "Add new transactions",
    edit: "Update transaction group",
    repeat: "Repeat transaction group",
  };
  const pageTitle = pageTitleMap[mode];
  
  // Load accounts
  useEffect(() => {
    const loadAccounts = async () => {
      setAccountsLoading(true);
      setAccountsError("");
      try {
        const data = await accountService.getActiveAccounts();
        setAccounts(data);
      } catch (err) {
        console.error("Failed to load accounts", err);
        setAccounts([]);
        setAccountsError("Failed to load accounts");
        showToast("Failed to load accounts", "error");
      } finally {
        setAccountsLoading(false);
      }
    };
    loadAccounts();
  }, [showToast]);
  
  // Load brands
  useEffect(() => {
    const loadBrands = async () => {
      setBrandsLoading(true);
      setBrandsError("");
      try {
        const data = await brandService.getAllBrands();
        setBrands(data);
      } catch (err) {
        console.error("Failed to load brands", err);
        setBrands([]);
        setBrandsError("Failed to load brands");
        showToast("Failed to load brands", "error");
      } finally {
        setBrandsLoading(false);
      }
    };
    loadBrands();
  }, [showToast]);
  
  // Load locations
  useEffect(() => {
    const loadLocations = async () => {
      setLocationsLoading(true);
      setLocationsError("");
      try {
        const data = await locationService.getAllLocations();
        setLocations(data);
      } catch (err) {
        console.error("Failed to load locations", err);
        setLocations([]);
        setLocationsError("Failed to load locations");
        showToast("Failed to load locations", "error");
      } finally {
        setLocationsLoading(false);
      }
    };
    loadLocations();
  }, [showToast]);
  
  // Load transaction types
  useEffect(() => {
    const loadTransactionTypes = async () => {
      setTransactionTypesLoading(true);
      setTransactionTypesError("");
      try {
        const data = await transactionTypeService.getAllTransactionTypes();
        setTransactionTypes(data);
      } catch (err) {
        console.error("Failed to load transaction types", err);
        setTransactionTypes([]);
        setTransactionTypesError("Failed to load transaction types");
        showToast("Failed to load transaction types", "error");
      } finally {
        setTransactionTypesLoading(false);
      }
    };
    loadTransactionTypes();
  }, [showToast]);
  
  // Load transaction group for edit/repeat mode
  useEffect(() => {
    if (mode === "create") return;
    if (!groupId) return;
    const loadGroup = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        const groupData =
          await transactionGroupService.getTransactionGroupById(groupId);
        setGroup(groupData);
        setTransactions(
          groupData.transactions.map((t) => ({
            id: mode === "repeat" ? crypto.randomUUID() : t.id,
            date: mode === "repeat" ? getToday() : t.transactionDate.split("T")[0],
            transactionTypeId: t.transactionTypeId ?? "",
            brandId: t.brandId ?? "",
            locationId: t.locationId ?? "",
            amount: String(t.amount),
            notes: t.notes ?? "",
            accountId: t.accountId,
            posted: mode === "repeat" ? false : t.posted,
          }))
        );
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to load transaction group");
        showToast("Failed to load transaction group", "error");
      } finally {
        setLoading(false);
      }
    };
    loadGroup();
  }, [groupId, mode, showToast]);
  
  // Soft check transaction.date with the selected account (between account.open and account.close dates)
  useEffect(() => {
    const timeouts: Record<string, ReturnType<typeof setTimeout>> = {};
    
    transactions.forEach((tx) => {
      const hasDate = !!tx.date;
      const hasAccount = !!tx.accountId;
      
      if (!hasDate || !hasAccount) return;
      
      const key = tx.id;
      
      // debounce per row
      if (timeouts[key]) clearTimeout(timeouts[key]);
      
      timeouts[key] = setTimeout(async () => {
        try {
          const res = await accountService.validateAccountDate(
            tx.accountId,
            tx.date.split("T")[0]
          );
          
          setDateValidationMap((prev) => ({
            ...prev,
            [key]: res.valid,
          }));
        } catch (err) {
          console.error("Date validation failed", err);
          
          setDateValidationMap((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      }, 500);
    });
    
    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, [transactions]);
  
  const renderAccountOptions = () => {
    if (accountsLoading) {
      return <option value="">Loading accounts...</option>;
    }
    if (accountsError) {
      return <option value="">Error loading accounts</option>;
    }
    return (
      <>
        <option value="">Select account</option>
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.name}
          </option>
        ))}
      </>
    );
  };
  
  const renderBrandOptions = () => {
    if (brandsLoading) {
      return <option value="">Loading brands...</option>;
    }
    if (brandsError) {
      return <option value="">Error loading brands</option>;
    }
    return (
      <>
        <option value="">Select brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </>
    );
  };
  
  const renderLocationOptions = () => {
    if (locationsLoading) {
      return <option value="">Loading locations...</option>;
    }
    if (locationsError) {
      return <option value="">Error loading locations</option>;
    }
    return (
      <>
        <option value="">Select location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.city}, {location.state}
          </option>
        ))}
      </>
    );
  };
  
  const renderTransactionTypeOptions = () => {
    if (transactionTypesLoading) {
      return <option value="">Loading transaction types...</option>;
    }
    
    if (transactionTypesError) {
      return <option value="">Error loading transaction types</option>;
    }
    
    return (
      <>
        <option value="">Select type</option>
        
        {transactionTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </>
    );
  };
  
  const addBlankTransaction = () => {
    setTransactions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: getToday(),
        transactionTypeId: "",
        brandId: "",
        locationId: "",
        amount: "",
        notes: "",
        accountId: "",
        posted: false,
      },
    ]);
  };
  
  const duplicateLastTransaction = () => {
    setTransactions((prev) => {
      const last = prev.length > 0 ? prev[prev.length - 1] : null;
      
      const lastDate = last?.date || getToday();
      const lastType = last?.transactionTypeId || "";
      const lastBrand = last?.brandId || "";
      const lastLocation = last?.locationId || "";
      const lastAmount = last?.amount || "";
      const lastAccount = last?.accountId || "";
      const lastNotes = last?.notes || "";
      
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          date: lastDate,
          transactionTypeId: lastType,
          brandId: lastBrand,
          locationId: lastLocation,
          amount: lastAmount,
          notes: lastNotes,
          accountId: lastAccount,
          posted: false,
        },
      ];
    });
  };
  
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast("Transaction removed", "success");
  };
  
  const updateField = <K extends keyof Transaction>(
    id: string,
    field: K,
    value: Transaction[K]
  ) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      )
    );
  };
  
  const markAsPosted = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, posted: true } : t
      )
    );
    showToast("Marked as posted", "success");
  };
  
  const submitAll = async () => {
    try {
      const validTransactions = transactions.filter(
        (tx) => tx.date && tx.accountId && Number(tx.amount) !== 0
      );
      const isEmptyAfterUpdate = validTransactions.length === 0;
      
      const createPayload = {
        transactions: validTransactions.map((tx) => ({
          transactionDate: new Date(tx.date).toISOString(),
          amount: Number(tx.amount),
          notes: tx.notes,
          accountId: tx.accountId,
          brandId: tx.brandId || undefined,
          locationId: tx.locationId || undefined,
          transactionTypeId: tx.transactionTypeId || undefined,
        })),
      };
      
      const updatePayload: TransactionGroupResponseDto = {
        id: groupId!,
        reportId: group?.reportId ?? null,
        repeatable: group?.repeatable ?? false,
        transactions: validTransactions.map((tx) => ({
          id: tx.id || "", // backend can add new transactions to this group
          transactionGroupId: groupId!,
          transactionDate: new Date(tx.date).toISOString(),
          amount: Number(tx.amount),
          notes: tx.notes,
          accountId: tx.accountId,
          brandId: tx.brandId || null,
          locationId: tx.locationId || null,
          transactionTypeId: tx.transactionTypeId || null,
          posted: tx.posted ?? false,
        })),
      };
      
      const res = mode === "edit"
        ? await transactionGroupService.updateTransactionGroup(updatePayload)
        : await transactionGroupService.createTransactionGroup(createPayload); // Create or Repeat
      showToast(res.message || "Transactions submitted", "success");
      // redirect to transaction list or detail page
      if (mode === "edit") {
        if (isEmptyAfterUpdate) {
          navigate(".."); // fallback to list/index
        } else {
          navigate(`../details/${groupId}`);
        }
      } else {
        navigate("..");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to submit transactions", "error");
    }
  };
  
  const cancel = () => {
    window.location.reload();
  };
  
  const goBack = () => {
    showToast("Mocking Navigate to pending transactions button");
  };
  
  const addCashbackTransaction = (percent: number) => {
    showToast(`Mocking cashback transaction: ${percent}%`, "success");
  };
  
  const splitFirst = (count: number) => {
    showToast(`Mocking split first transaction: ${count}`, "success");
  };
  
  const splitAll = (count: number) => {
    showToast(`Mocking split all transaction: ${count}`, "success");
  };
  
  const addAccount = () => {
    navigate("../../accounts/add");
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.row}>
          <button
            className={styles.button + " " + styles.secondary}
            onClick={addAccount}>
            + Account
          </button>
          <button
            className={styles.button + " " + styles.secondary}
            onClick={() => showToast("Mock add brand button", "success")}>
            + Brand
          </button>
          <button
            className={styles.button + " " + styles.secondary}
            onClick={() => showToast("Mock add location button", "success")}>
            + Location
          </button>
        </div>
        <h1 className={styles.title}>{pageTitle}</h1>
        
        {/* Loading */}
        {loading && <div className={styles.message}>Loading...</div>}
        
        {/* Error */}
        {errorMessage && (
          <div className={styles.error}>{errorMessage}</div>
        )}
        
        {/* Empty state */}
        {!loading && transactions.length === 0 && (
          <div className={styles.message}>
            No transactions found
          </div>
        )}
        
        {/* TABLE */}
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
              <col style={{ width: "12%" }} />   {/* Actions */}
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
              <th>Actions</th>
            </tr>
            </thead>
            
            <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className={tx.posted ? styles.posted : ""}>
                <td>
                  <input
                    type="date"
                    value={tx.date}
                    onChange={(e) =>
                      updateField(tx.id, "date", e.target.value)
                    }
                    disabled={tx.posted}
                  />
                </td>
                
                <td>
                  <select
                    value={tx.transactionTypeId}
                    onChange={(e) =>
                      updateField(tx.id, "transactionTypeId", e.target.value)
                    }
                    disabled={
                      tx.posted ||
                      transactionTypesLoading ||
                      !!transactionTypesError
                    }
                  >
                    {renderTransactionTypeOptions()}
                  </select>
                </td>
                
                <td>
                  <select
                    value={tx.brandId}
                    onChange={(e) =>
                      updateField(tx.id, "brandId", e.target.value)
                    }
                    disabled={tx.posted || brandsLoading || !!brandsError}
                  >
                    {renderBrandOptions()}
                  </select>
                </td>
                
                <td>
                  <select
                    value={tx.locationId}
                    onChange={(e) =>
                      updateField(tx.id, "locationId", e.target.value)
                    }
                    disabled={tx.posted || locationsLoading || !!locationsError}
                  >
                    {renderLocationOptions()}
                  </select>
                </td>
                
                <td>
                  <input
                    type="number"
                    value={tx.amount}
                    onChange={(e) =>
                      updateField(tx.id, "amount", e.target.value)
                    }
                    disabled={tx.posted}
                  />
                </td>
                
                <td>
                  <input
                    type="text"
                    value={tx.notes}
                    onChange={(e) =>
                      updateField(tx.id, "notes", e.target.value)
                    }
                    disabled={tx.posted}
                  />
                </td>
                
                <td>
                  <select
                    value={tx.accountId}
                    onChange={(e) =>
                      updateField(tx.id, "accountId", e.target.value)
                    }
                    disabled={tx.posted || accountsLoading || !!accountsError}
                  >
                    {renderAccountOptions()}
                  </select>
                  {dateValidationMap[tx.id] === false && (
                    <small className={styles.errorText}>
                      Date is outside account active period
                    </small>
                  )}
                </td>
                
                <td>
                  <button
                    className={styles.button + " " + styles.primary}
                    onClick={() => markAsPosted(tx.id)}
                    disabled={tx.posted || !(mode === "edit")}
                  >
                    Posted
                  </button>
                  
                  <button
                    className={styles.button + " " + styles.danger}
                    onClick={() => deleteTransaction(tx.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        
        {/* ACTIONS */}
        <div className={styles.actions}>
          <div className={styles.row}>
            <button
              className={styles.button + " " + styles.secondary}
              onClick={duplicateLastTransaction}>+ Duplicate last row</button>
            <button
              className={styles.button + " " + styles.secondary}
              onClick={addBlankTransaction}>+ New Transaction</button>
            <button
              className={styles.button + " " + styles.secondary}
              onClick={() => setShowCashbackInput(true)}>
              + Cashback %
            </button>
            
            {showCashbackInput && (
              <div className={styles.inline}>
                <input
                  type="number"
                  value={cashbackPercent}
                  onChange={(e) =>
                    setCashbackPercent(Number(e.target.value))
                  }
                />
                <button
                  className={styles.button + " " + styles.primary}
                  onClick={() => addCashbackTransaction(cashbackPercent)}>
                  Add
                </button>
                <button
                  className={styles.button + " " + styles.danger}
                  onClick={() => setShowCashbackInput(false)}>
                  Cancel
                </button>
              </div>
            )}
            
            <button
              className={styles.button + " " + styles.secondary}
              onClick={() => setShowSplitFirstInput(true)}>
              + Split First
            </button>
            
            {showSplitFirstInput && (
              <div className={styles.inline}>
                <input
                  type="number"
                  value={splitFirstCount}
                  onChange={(e) =>
                    setSplitFirstCount(Number(e.target.value))
                  }
                />
                
                <button
                  className={styles.button + " " + styles.primary}
                  onClick={() => splitFirst(splitFirstCount)}>
                  Split
                </button>
                
                <button
                  className={styles.button + " " + styles.danger}
                  onClick={() => setShowSplitFirstInput(false)}>
                  Cancel
                </button>
              </div>
            )}
            
            <button
              className={styles.button + " " + styles.secondary}
              onClick={() => setShowSplitAllInput(true)}>
              + Split All
            </button>
            
            {showSplitAllInput && (
              <div className={styles.inline}>
                <input
                  type="number"
                  value={splitAllCount}
                  onChange={(e) =>
                    setSplitAllCount(Number(e.target.value))
                  }
                />
                
                <button
                  className={styles.button + " " + styles.primary}
                  onClick={() => splitAll(splitAllCount)}>
                  Split
                </button>
                
                <button
                  className={styles.button + " " + styles.danger}
                  onClick={() => setShowSplitAllInput(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          
          <div className={styles.stackRow}>
            <button className={styles.button + " " + styles.primary} onClick={submitAll} disabled={isInvalid}>
              {(mode === "edit") ? "Update transactions" : "Submit transactions"}
            </button>
            <button className={styles.button + " " + styles.danger} onClick={cancel}>Cancel / Reset this page</button>
            <button className={styles.button + " " + styles.secondary} onClick={goBack}>Go to Pending list</button>
          </div>
        </div>
      </div>
    </div>
  );
}