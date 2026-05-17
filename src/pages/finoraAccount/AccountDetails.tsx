import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { accountService, type AccountBalanceResponseDto } from "../../utils/accountService";
import styles from "./AccountDetails.module.scss";

type DailyBalanceDto = {
  date: string;
  balance: number;
};

type AccountDetailsDto = {
  id: string;
  name: string;
  type: string;
  bankName: string;
  userEmail: string;
  pendingBalance: number;
  postedBalance: number;
  bankGroupName: string;
};

function getLocalDateString() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
}

function formatDateOnly(dateTime: string) {
  return new Date(dateTime).toLocaleDateString();
}

export default function AccountDetails() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<string>("");
  
  const [account, setAccount] =
    useState<AccountDetailsDto | null>(null);
  
  const [dailyBalances, setDailyBalances] = useState<
    DailyBalanceDto[]
  >([]);
  
  const [balanceAsOfDate, setBalanceAsOfDate] =
    useState<string>("");
  
  const [calculatedBalance, setCalculatedBalance] =
    useState<AccountBalanceResponseDto | null>(null);
  
  useEffect(() => {
    const loadAccountDetails = async () => {
      setLoading(true);
      setError("");
      try {
        if (!accountId) {
          setError("Missing account id");
          setLoading(false);
          return;
        }
        const res = await accountService.getAccountById(accountId);
        setAccount({
          id: res.id,
          name: res.name,
          type: res.type,
          bankName: res.bankName,
          userEmail: "", // backend does not provide this
          pendingBalance: res.pendingBalance ?? 0,
          postedBalance: res.postedBalance ?? 0,
          bankGroupName: res.bankName, // placeholder until backend supports grouping
        });
        // TEMP: still mocked until backend supports it
        // MOCK DAILY BALANCES
        setDailyBalances([
          {
            date: "2026-05-15",
            balance: 2250.17,
          },
          {
            date: "2026-05-14",
            balance: 2187.42,
          },
          {
            date: "2026-05-13",
            balance: 2104.88,
          },
        ]);
      } catch (err) {
        console.error("Failed to load account details", err);
        setAccount(null);
        setDailyBalances([]);
        setError("Unable to load account details.");
      } finally {
        setLoading(false);
      }
    };
    loadAccountDetails();
  }, [accountId]);
  
  function handleEditAccount() {
    navigate(`../edit/${account?.id}`);
  }
  
  function handleListAllAccounts() {
    navigate("../list");
  }
  
  function handleListRelatedAccounts() {
    navigate(
      `../list?bankGroupName=${encodeURIComponent(
        account?.bankGroupName ?? ""
      )}`
    );
  }
  
  async function handleCalculateBalance() {
    try {
      if (!account?.id) return;
      
      setBalanceLoading(true);
      setBalanceError("");
      setCalculatedBalance(null);
      
      const dateToUse =
        balanceAsOfDate?.trim()
          ? balanceAsOfDate
          : getLocalDateString(); // LOCAL DATE
      
      if (!balanceAsOfDate?.trim()) {
        setBalanceAsOfDate(dateToUse);
      }
      
      const res = await accountService.getAccountBalanceAsOfDate({
        accountId: account.id,
        asOfDate: new Date(dateToUse).toISOString(),
      });
      
      setCalculatedBalance(res);
    } catch (err) {
      console.error("Failed to calculate balance", err);
      setBalanceError("Failed to calculate balance");
      setCalculatedBalance(null);
    } finally {
      setBalanceLoading(false);
    }
  }
  
  function handleQuickSearch(date: string) {
    navigate(
      `/transactions/search?accountId=${account?.id}&startDate=${date}&endDate=${date}`
    );
  }
  
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.empty}>
            Loading account details...
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.empty}>
            {error}
          </div>
        </div>
      </div>
    );
  }
  
  if (!account) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.empty}>
            Account not found.
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* PAGE TITLE */}
        <h1 className={styles.title}>
          Account Details
        </h1>
        
        {/* ACCOUNT INFORMATION */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Account Information
          </h2>
          
          <table className={styles.detailTable}>
            <tbody>
            <tr>
              <td className={styles.label}>ID</td>
              
              <td className={styles.value}>
                {account.id}
              </td>
            </tr>
            
            <tr>
              <td className={styles.label}>
                Name
              </td>
              
              <td className={styles.value}>
                {account.name}
              </td>
            </tr>
            
            <tr>
              <td className={styles.label}>
                Type
              </td>
              
              <td className={styles.value}>
                {account.type}
              </td>
            </tr>
            
            <tr>
              <td className={styles.label}>
                Bank Name
              </td>
              
              <td className={styles.value}>
                {account.bankName}
              </td>
            </tr>
            
            <tr>
              <td className={styles.label}>
                User Email
              </td>
              
              <td className={styles.value}>
                {account.userEmail}
              </td>
            </tr>
            
            <tr>
              <td className={styles.label}>
                Pending Balance
              </td>
              
              <td className={styles.value}>
                  <span
                    className={
                      styles.pendingBalance
                    }
                  >
                    $
                    {account.pendingBalance.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </span>
              </td>
            </tr>
            
            <tr>
              <td className={styles.label}>
                Posted Balance
              </td>
              
              <td className={styles.value}>
                  <span
                    className={
                      styles.postedBalance
                    }
                  >
                    $
                    {account.postedBalance.toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </span>
              </td>
            </tr>
            </tbody>
          </table>
        </section>
        
        {/* ACTION BUTTONS */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Actions
          </h2>
          
          <div className={styles.actionGroup}>
            <button
              className={styles.actionButton}
              onClick={handleEditAccount}
            >
              Edit This Account
            </button>
            
            <button
              className={styles.actionButton}
              onClick={handleListAllAccounts}
            >
              List All Accounts
            </button>
            
            <button
              className={styles.actionButton}
              onClick={handleListRelatedAccounts}
            >
              List Related Accounts
            </button>
          </div>
        </section>
        
        {/* CALCULATE BALANCE */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Calculate Account Balance
          </h2>
          
          <div className={styles.calculatorRow}>
            <input
              className={styles.input}
              type="date"
              value={balanceAsOfDate}
              onChange={(e) => setBalanceAsOfDate(e.target.value)}
              disabled={balanceLoading}
            />
            
            <button
              className={styles.actionButton}
              onClick={handleCalculateBalance}
              disabled={balanceLoading}
            >
              {balanceLoading ? "Calculating..." : "Calculate"}
            </button>
          </div>
          
          {balanceError && (
            <div className={styles.empty}>
              {balanceError}
            </div>
          )}
          
          {calculatedBalance && !balanceLoading && (
            <div className={styles.resultBox}>
              <div>
                Balance as of {formatDateOnly(calculatedBalance.asOfDate)}:
              </div>
              
              <div>
                Pending: $
                {calculatedBalance.pendingBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              
              <div>
                Posted: $
                {calculatedBalance.postedBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          )}
        </section>
        
        {/* DAILY BALANCES */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Recent Daily Balances
          </h2>
          
          {dailyBalances.length === 0 ? (
            <div className={styles.empty}>
              No daily balance data
              available.
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
                </thead>
                
                <tbody>
                {dailyBalances.map((item) => (
                  <tr key={item.date}>
                    <td>{item.date}</td>
                    
                    <td>
                      $
                      {item.balance.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                    
                    <td>
                      <button
                        className={
                          styles.actionButton
                        }
                        onClick={() =>
                          handleQuickSearch(
                            item.date
                          )
                        }
                      >
                        Quick Search
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}