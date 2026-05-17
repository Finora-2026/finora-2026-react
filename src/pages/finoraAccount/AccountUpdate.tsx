import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/ToastProvider/toastContext.ts";

import { type BankResponseDto, bankService } from "../../utils/bankService.ts";
import { type AccountTypeResponseDto, accountTypeService } from "../../utils/accountTypeService.ts";
import { accountService } from "../../utils/accountService.ts";

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
  
  // Track loading existing account and original account name
  const [originalName, setOriginalName] = useState<string>("");
  const [loadingAccount, setLoadingAccount] = useState(isEditMode);
  const [isClosedAccount, setIsClosedAccount] = useState(false);
  
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
  
  // Fetch Existing Account Data if in Edit Mode
  useEffect(() => {
    if (!isEditMode || !accountId) return;
    
    const loadAccountData = async () => {
      setLoadingAccount(true);
      try {
        const accountDto = await accountService.getEditAccountDtoById(accountId);
        
        // Save the original name to bypass name check if unchanged
        setOriginalName(accountDto.name);
        setIsClosedAccount(!!accountDto.closingDate);
        
        // Map the backend DTO directly to your component's internal form state
        setForm({
          bankId: accountDto.bankId,
          accountName: accountDto.name,
          // Safely extract just the 'YYYY-MM-DD' segment from ISO string
          openingDate: accountDto.openingDate ? accountDto.openingDate.split("T")[0] : "",
          closingDate: accountDto.closingDate ? accountDto.closingDate.split("T")[0] : "",
          accountType: accountDto.typeId,
        });
      } catch (err) {
        console.error("Failed to load account details", err);
        showToast("Failed to load account details", "error");
        navigate(".."); // Go back if we can't find the account data
      } finally {
        setLoadingAccount(false);
      }
    };
    
    loadAccountData();
  }, [accountId, isEditMode, navigate, showToast]);
  
  // Load bank info
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
  
  // Derived state: unchanged name in edit mode
  const trimmedName = form.accountName.trim();
  const isOriginalName =
    isEditMode &&
    trimmedName.toLowerCase() === originalName.trim().toLowerCase();
  // Check if account name is valid
  useEffect(() => {
    // no name, skip API call
    if (!trimmedName) {
      return;
    }
    
    // unchanged original name, skip validation API
    if (isOriginalName) {
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      setCheckingName(true);
      
      try {
        const available = await accountService.checkAccountNameAvailability(trimmedName);
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
  }, [trimmedName, isOriginalName]);
  
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
  
  // Handle Create vs Update Logic on Submit
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
    
    if (isClosedAccount) {
      showToast("Finalized accounts cannot be updated", "error");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const payload = {
        id: isEditMode ? accountId : null, // Include id to target existing account
        name: form.accountName,
        bankId: form.bankId,
        openingDate: new Date(form.openingDate).toISOString(),
        closingDate: form.closingDate ? new Date(form.closingDate).toISOString() : null,
        typeId: form.accountType,
      };
      
      // Mock the update account API for now
      if (isEditMode) {
        showToast("Mocking account update API, wait for BE", "success");
      } else {
        await accountService.createAccount(payload);
        showToast("New account created successfully", "success");
      }
      
      // redirect to account home page
      navigate("..");
    } catch (err) {
      console.error(err);
      showToast(
        err instanceof Error
          ? err.message
          : `Failed to ${isEditMode ? "update" : "create"} account`,
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };
  
  // Render a simple loading screen while fetching initial account info
  if (loadingAccount) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p>Loading account configurations...</p>
        </div>
      </div>
    );
  }
  
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
              disabled={submitting || loadingBanks || !!bankError}
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
                {isEditMode && form.accountName.trim() === originalName.trim()
                  ? "Current name"
                  : "Account name is available"}
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
              // Enabled closing date selection during edit mode
              disabled={submitting || !isEditMode}
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
              disabled={submitting || loadingAccountTypes || !!accountTypeError}
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
            disabled={submitting || isClosedAccount}
          >
            {isClosedAccount
              ? "Account Closed"
              : renderButtonText()}
          </button>
        </form>
      </div>
    </div>
  );
}