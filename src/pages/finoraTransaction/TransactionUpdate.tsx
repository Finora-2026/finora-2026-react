import {useEffect, useState} from "react";
import styles from "./TransactionUpdate.module.scss";
import {
  accountService,
  type AccountResponseDto,
} from "../../utils/accountService.ts";
import {useToast} from "../../components/ToastProvider/toastContext.ts";

type Transaction = {
  id: string;
  date: string;
  transactionTypeId: string;
  brandId: string;
  locationId: string;
  amount: number;
  notes: string;
  accountId: string;
  posted: boolean;
};

export default function TransactionUpdate() {
  const { showToast } = useToast();
  const [loading] = useState(false);
  const [errorMessage] = useState<string | null>(null);
  
  const [accounts, setAccounts] = useState<AccountResponseDto[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState("");
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "t1",
      date: "",
      transactionTypeId: "",
      brandId: "",
      locationId: "",
      amount: 0,
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
  
  const pageTitle = "Add new transaction [OR] Update transaction";
  
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
  
  // -----------------------------
  // Mock actions
  // -----------------------------
  const addTransaction = () => {
    setTransactions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: "",
        transactionTypeId: "",
        brandId: "",
        locationId: "",
        amount: 0,
        notes: "",
        accountId: "",
        posted: false,
      },
    ]);
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
  
  const submitAll = () => {
    try {
      console.log("Submit transactions:", transactions);
      showToast("Transactions submitted", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to submit transactions", "error");
    }
  };
  
  const cancel = () => {
    console.log("Reset");
  };
  
  const goBack = () => {
    console.log("Navigate to pending transactions");
  };
  
  const addCashbackTransaction = (percent: number) => {
    console.log("Cashback %:", percent);
  };
  
  const splitFirst = (count: number) => {
    console.log("Split first:", count);
  };
  
  const splitAll = (count: number) => {
    console.log("Split all:", count);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
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
                    disabled={tx.posted}
                  >
                    <option value="">Type</option>
                    <option value="1">Food</option>
                    <option value="2">Shopping</option>
                  </select>
                </td>
                
                <td>
                  <select
                    value={tx.brandId}
                    onChange={(e) =>
                      updateField(tx.id, "brandId", e.target.value)
                    }
                    disabled={tx.posted}
                  >
                    <option value="">Brand</option>
                    <option value="1">Nike</option>
                    <option value="2">Apple</option>
                  </select>
                </td>
                
                <td>
                  <select
                    value={tx.locationId}
                    onChange={(e) =>
                      updateField(tx.id, "locationId", e.target.value)
                    }
                    disabled={tx.posted}
                  >
                    <option value="">Location</option>
                    <option value="1">Dallas</option>
                    <option value="2">Austin</option>
                  </select>
                </td>
                
                <td>
                  <input
                    type="number"
                    value={tx.amount}
                    onChange={(e) =>
                      updateField(tx.id, "amount", Number(e.target.value))
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
                </td>
                
                <td>
                  <button
                    onClick={() => markAsPosted(tx.id)}
                    disabled={tx.posted}
                  >
                    Posted
                  </button>
                  
                  <button onClick={() => deleteTransaction(tx.id)}>
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
            <button onClick={addTransaction}>+ Add</button>
            
            <button onClick={() => setShowCashbackInput(true)}>
              Cashback %
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
                <button onClick={() => addCashbackTransaction(cashbackPercent)}>
                  Add
                </button>
                <button onClick={() => setShowCashbackInput(false)}>
                  Cancel
                </button>
              </div>
            )}
            
            <button onClick={() => setShowSplitFirstInput(true)}>
              Split First
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
                <button onClick={() => splitFirst(splitFirstCount)}>
                  Split
                </button>
              </div>
            )}
            
            <button onClick={() => setShowSplitAllInput(true)}>
              Split All
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
                <button onClick={() => splitAll(splitAllCount)}>
                  Split
                </button>
              </div>
            )}
          </div>
          
          <div className={styles.row}>
            <button onClick={submitAll}>Submit</button>
            <button onClick={cancel}>Reset</button>
            <button onClick={goBack}>Pending</button>
          </div>
        </div>
      </div>
    </div>
  );
}