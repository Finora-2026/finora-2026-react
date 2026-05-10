import styles from "./AccountCreate.module.scss";

export default function AccountCreate() {
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
            
            <input
              id="bank"
              type="text"
              placeholder="Enter bank name"
              className={styles.input}
            />
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