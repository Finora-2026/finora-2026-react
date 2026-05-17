import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useToast } from "../../components/ToastProvider/toastContext.ts";

import { type BankResponseDto, bankService } from "../../utils/bankService.ts";
import {type AccountTypeResponseDto, accountTypeService} from "../../utils/accountTypeService.ts";
import {accountService} from "../../utils/accountService.ts";

import styles from "./AccountCreate.module.scss";

type AccountForm = {
  bankId: string;
  accountName: string;
  openingDate: string;
  closingDate: string;
  accountType: string;
};

export default function AccountUpdate() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { accountId } = useParams<{ accountId: string }>();
  const isEditMode = !!accountId;
  
  const [submitting, setSubmitting] = useState(false);
  
  const [banks, setBanks] = useState<BankResponseDto[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [bankError, setBankError] = useState<string | null>(null);
  
  const [accountTypes, setAccountTypes] = useState<AccountTypeResponseDto[]>([]);
  const [loadingAccountTypes, setLoadingAccountTypes] = useState(true);
  const [accountTypeError, setAccountTypeError] = useState<string | null>(null);
  
  const [checkingName, setCheckingName] = useState(false);
  const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  
  const [form, setForm] = useState<AccountForm>({
    bankId: "",
    accountName: "",
    openingDate: new Date().toISOString().split("T")[0],
    closingDate: "",
    accountType: "",
  });
  
  // Loading bank info
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
  
  // Load account type info
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
  
  // Check if account name is valid
  useEffect(() => {
    const trimmedName = form.accountName.trim();
    
    // no name, skip API call
    if (!trimmedName) {
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      setCheckingName(true);
      
      try {
        const available =
          await accountService.checkAccountNameAvailability(trimmedName);
        
        setNameAvailable(available);
        
        if (!available) {
          setNameError("Account name already exists");
        } else {
          setNameError(null);
        }
        
      } catch (err) {
        console.error(err);
        
        setNameAvailable(null);
        setNameError("Unable to validate account name");
        
      } finally {
        setCheckingName(false);
      }
    }, 500); // debounce
    
    return () => clearTimeout(timeoutId);
    
  }, [form.accountName]);
  
  const renderTitle = () => {
    return isEditMode ? `Update account: ${accountId}` : "Add Account";
  };
  
  const renderButtonText = () => {
    if (submitting) {
      return isEditMode ? "Updating..." : "Creating...";
    }
    return isEditMode ? "Update Account" : "Create Account";
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    
    // reset validation immediately while typing
    if (id === "accountName") {
      setNameAvailable(null);
      setNameError(null);
    }
    
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (submitting) return;
    
    if (
      !form.bankId ||
      !form.accountName ||
      !form.openingDate ||
      !form.accountType
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    
    if (nameAvailable === false) {
      showToast("Account name already exists", "error");
      return;
    }
    
    setSubmitting(true);
    
    try {
      await accountService.createAccount({
        name: form.accountName,
        bankId: form.bankId,
        openingDate: new Date(form.openingDate).toISOString(),
        closingDate: form.closingDate ? new Date(form.closingDate).toISOString() : null,
        typeId: form.accountType,
      });
      
      showToast("Account created successfully", "success");
      
      // redirect to account home page
      navigate("..");
      
      // optional reset, we will leave the page too, so this code is not important.
      setForm({
        bankId: "",
        accountName: "",
        openingDate: new Date().toISOString().split("T")[0],
        closingDate: "",
        accountType: "",
      });
      
    } catch (err) {
      console.error(err);
      showToast(
        err instanceof Error
          ? err.message
          : "Failed to create account",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{renderTitle()}</h1>
        
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
              disabled={
                submitting ||
                loadingBanks ||
                !!bankError
              }
            >
              <option value="">
                {loadingBanks
                  ? "Loading banks..."
                  : bankError
                    ? "Unable to load banks"
                    : "Select bank"}
              </option>
              
              {!loadingBanks &&
                !bankError &&
                banks.map((bank) => (
                  <option
                    key={bank.id}
                    value={bank.id}
                  >
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
              className={`${styles.input} ${
                nameAvailable === false
                  ? styles.inputError
                  : nameAvailable === true
                    ? styles.inputSuccess
                    : ""
              }`}
              value={form.accountName}
              onChange={handleChange}
              disabled={submitting}
            />
            
            {checkingName && (
              <small className={styles.checkingText}>
                Checking availability...
              </small>
            )}
            
            {!checkingName && nameAvailable === true && (
              <small className={styles.successText}>
                Account name is available
              </small>
            )}
            
            {!checkingName && nameError && (
              <small className={styles.errorText}>
                {nameError}
              </small>
            )}
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
              disabled={submitting}
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
              disabled={
                submitting ||
                loadingAccountTypes ||
                !!accountTypeError
              }
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
          
          <button
            type="submit"
            className={styles.button}
            disabled={submitting}
          >
            {renderButtonText()}
          </button>
        </form>
      </div>
    </div>
  );
}