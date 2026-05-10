import { useEffect, useState } from "react";
import styles from "./AccountCreate.module.scss";
import { type BankResponseDto, bankService } from "../../utils/bankService.ts";
import { useToast } from "../../components/ToastProvider/toastContext.ts";

export default function AccountCreate() {
  const { showToast } = useToast();
  
  const [banks, setBanks] = useState<BankResponseDto[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [bankError, setBankError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadBanks = async () => {
      setLoadingBanks(true);
      setBankError(null);
      
      try {
        const data = await bankService.getAllBanks();
        setBanks(data);
      } catch (err) {
        console.error("Failed to load banks", err);
        
        setBanks([]); // clear stale data
        setBankError("Failed to load banks");
        showToast("Failed to load banks", "error");
      } finally {
        setLoadingBanks(false);
      }
    };
    
    loadBanks();
  }, [showToast]);
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Add Account</h1>
        
        <form className={styles.form}>
          {/* Bank */}
          <div className={styles.field}>
            <label htmlFor="bank" className={styles.label}>
              Bank
            </label>
            
            <select
              id="bank"
              defaultValue=""
              className={styles.input}
              disabled={loadingBanks || !!bankError}
            >
              <option value="" disabled>
                {loadingBanks
                  ? "Loading banks..."
                  : bankError
                    ? "Unable to load banks"
                    : "Select bank"}
              </option>
              
              {!loadingBanks && !bankError &&
                banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
            </select>
          </div>
          
          {/* Account Name */}
          <div className={styles.field}>
            <label htmlFor="accountName" className={styles.label}>
              Account Name
            </label>
            
            <input
              id="accountName"
              type="text"
              placeholder="Enter account name"
              className={styles.input}
            />
          </div>
          
          {/* Opening Date */}
          <div className={styles.field}>
            <label htmlFor="openingDate" className={styles.label}>
              Opening Date
            </label>
            
            <input id="openingDate" type="date" className={styles.input} />
          </div>
          
          {/* Closing Date */}
          <div className={styles.field}>
            <label htmlFor="closingDate" className={styles.label}>
              Closing Date
            </label>
            
            <input id="closingDate" type="date" disabled className={styles.input} />
          </div>
          
          {/* Account Type */}
          <div className={styles.field}>
            <label htmlFor="accountType" className={styles.label}>
              Account Type
            </label>
            
            <select id="accountType" defaultValue="" className={styles.input}>
              <option value="" disabled>
                Select account type
              </option>
              
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit-card">Credit Card</option>
              <option value="investment">Investment</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          
          <button type="submit" className={styles.button}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}