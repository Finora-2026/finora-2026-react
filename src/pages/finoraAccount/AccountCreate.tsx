import { useEffect, useState } from "react";
import styles from "./AccountCreate.module.scss";
import { type BankResponseDto, bankService } from "../../utils/bankService.ts";
import { useToast } from "../../components/ToastProvider/toastContext.ts";
import {type AccountTypeResponseDto, accountTypeService} from "../../utils/accountTypeService.ts";
import {accountService} from "../../utils/accountService.ts";

type AccountForm = {
  bankId: string;
  accountName: string;
  openingDate: string;
  closingDate: string;
  accountType: string;
};

export default function AccountCreate() {
  const { showToast } = useToast();
  
  const [banks, setBanks] = useState<BankResponseDto[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [bankError, setBankError] = useState<string | null>(null);
  
  const [accountTypes, setAccountTypes] = useState<AccountTypeResponseDto[]>([]);
  const [loadingAccountTypes, setLoadingAccountTypes] = useState(true);
  const [accountTypeError, setAccountTypeError] = useState<string | null>(null);
  
  const [form, setForm] = useState<AccountForm>({
    bankId: "",
    accountName: "",
    openingDate: new Date().toISOString().split("T")[0],
    closingDate: "",
    accountType: "",
  });
  
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
  
  useEffect(() => {
    const loadAccountTypes = async () => {
      setLoadingAccountTypes(true);
      setAccountTypeError(null);
      
      try {
        const data = await accountTypeService.getAllAccountTypes();
        setAccountTypes(data);
      } catch (err) {
        console.error("Failed to load account types", err);
        
        setAccountTypes([]);
        setAccountTypeError("Failed to load account types");
        showToast("Failed to load account types", "error");
      } finally {
        setLoadingAccountTypes(false);
      }
    };
    
    loadAccountTypes();
  }, [showToast]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !form.bankId ||
      !form.accountName ||
      !form.openingDate ||
      !form.accountType
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    
    try {
      await accountService.createAccount({
        name: form.accountName,
        bankId: form.bankId,
        openingDate: new Date(form.openingDate).toISOString(),
        closingDate: form.closingDate ? new Date(form.closingDate).toISOString() : null,
        typeId: form.accountType,
      });
      
      showToast("Account created successfully", "success");
      
      // optional reset
      setForm({
        bankId: "",
        accountName: "",
        openingDate: new Date().toISOString().split("T")[0],
        closingDate: "",
        accountType: "",
      });
      
    } catch (err) {
      console.error(err);
      showToast(err instanceof Error ? err.message : "Failed to create account", "error");
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Add Account</h1>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Bank */}
          <div className={styles.field}>
            <label htmlFor="bankId" className={styles.label}>
              Bank
            </label>
            
            <select
              id="bankId"
              value={form.bankId}
              onChange={handleChange}
              className={styles.input}
              disabled={loadingBanks || !!bankError}
            >
              <option value="">
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
              value={form.accountName}
              onChange={handleChange}
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
              value={form.openingDate}
              onChange={handleChange}
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
              value={form.closingDate}
              onChange={handleChange}
            />
          </div>
          
          {/* Account Type */}
          <div className={styles.field}>
            <label htmlFor="accountType" className={styles.label}>
              Account Type
            </label>
            
            <select
              id="accountType"
              value={form.accountType}
              onChange={handleChange}
              className={styles.input}
              disabled={loadingAccountTypes || !!accountTypeError}
            >
              <option value="">
                {loadingAccountTypes
                  ? "Loading account types..."
                  : accountTypeError
                    ? "Unable to load account types"
                    : "Select account type"}
              </option>
              
              {!loadingAccountTypes &&
                !accountTypeError &&
                accountTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
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