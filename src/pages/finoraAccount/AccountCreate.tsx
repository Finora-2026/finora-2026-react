import { useEffect, useState } from "react";
import styles from "./AccountCreate.module.scss";
import {type BankResponseDto, bankService} from "../../utils/bankService.ts";

export default function AccountCreate() {
  
  const [banks, setBanks] = useState<BankResponseDto[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  
  useEffect(() => {
    
    const loadBanks = async () => {
      try {
        const data = await bankService.getAllBanks();
        setBanks(data);
      } catch (err) {
        console.error("Failed to load banks", err);
      } finally {
        setLoadingBanks(false);
      }
    };
    
    loadBanks();
    
  }, []);
  
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
              disabled={loadingBanks}
            >
              <option value="" disabled>
                {loadingBanks
                  ? "Loading banks..."
                  : "Select bank"}
              </option>
              
              {banks.map((bank) => (
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
            
            <input
              id="openingDate"
              type="date"
              className={styles.input}
            />
          </div>
          
          {/* Closing Date */}
          <div className={styles.field}>
            <label htmlFor="closingDate" className={styles.label}>
              Closing Date
            </label>
            
            <input
              id="closingDate"
              type="date"
              disabled
              className={styles.input}
            />
          </div>
          
          {/* Account Type */}
          <div className={styles.field}>
            <label htmlFor="accountType" className={styles.label}>
              Account Type
            </label>
            
            <select
              id="accountType"
              defaultValue=""
              className={styles.input}
            >
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
          
          {/* Submit */}
          <button type="submit" className={styles.button}>
            Create Account
          </button>
        
        </form>
      </div>
    </div>
  );
}