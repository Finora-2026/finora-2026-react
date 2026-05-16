import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type DailyBalanceDto = {
  date: string;
  balance: number;
};

type AccountDetailsDto = {
  id: string;
  name: string;
  type: string;
  userEmail: string;
  pendingBalance: number;
  postedBalance: number;
  bankGroupName: string;
};

export default function AccountDetails() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  const [account, setAccount] = useState<AccountDetailsDto | null>(null);
  
  const [dailyBalances, setDailyBalances] = useState<DailyBalanceDto[]>([]);
  
  const [balanceAsOfDate, setBalanceAsOfDate] = useState<string>("");
  const [calculatedBalance, setCalculatedBalance] = useState<number | null>(
    null
  );
  
  useEffect(() => {
    const loadAccountDetails = async () => {
      setLoading(true);
      setError("");
      
      try {
        // MOCK API DELAY
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // MOCK ACCOUNT
        setAccount({
          id: accountId ?? "ACC-001",
          name: "Primary Checking",
          type: "Checking",
          userEmail: "demo@example.com",
          pendingBalance: 2430.52,
          postedBalance: 2250.17,
          bankGroupName: "Chase",
        });
        
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
    console.log("Edit account");
    
    navigate(`../edit/${account?.id}`);
  }
  
  function handleListAllAccounts() {
    console.log("List all accounts");
    
    navigate("../list");
  }
  
  function handleListRelatedAccounts() {
    console.log("List related accounts");
    
    navigate(
      `../list?bankGroupName=${encodeURIComponent(
        account?.bankGroupName ?? ""
      )}`
    );
  }
  
  function handleCalculateBalance() {
    console.log("Calculate balance as of:", balanceAsOfDate);
    
    // MOCK CALCULATION
    setCalculatedBalance(1988.77);
  }
  
  function handleQuickSearch(date: string) {
    console.log("Quick search clicked");
    
    navigate(
      `/transactions/search?accountId=${account?.id}&startDate=${date}&endDate=${date}`
    );
  }
  
  if (loading) {
    return (
      <div>
        <p>Loading account details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!account) {
    return (
      <div>
        <p>Account not found.</p>
      </div>
    );
  }
  
  return (
    <div>
      {/* PAGE TITLE */}
      <h1>Account Details</h1>
      
      {/* ACCOUNT INFORMATION */}
      <section>
        <h2>Account Information</h2>
        
        <table>
          <tbody>
          <tr>
            <td>ID</td>
            <td>{account.id}</td>
          </tr>
          
          <tr>
            <td>Name</td>
            <td>{account.name}</td>
          </tr>
          
          <tr>
            <td>Type</td>
            <td>{account.type}</td>
          </tr>
          
          <tr>
            <td>User Email</td>
            <td>{account.userEmail}</td>
          </tr>
          
          <tr>
            <td>Pending Balance</td>
            <td>
                <span>
                  ${account.pendingBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                </span>
            </td>
          </tr>
          
          <tr>
            <td>Posted Balance</td>
            <td>
                <span>
                  ${account.postedBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                </span>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
      
      {/* ACTION BUTTONS */}
      <section>
        <h2>Actions</h2>
        
        <div>
          <button onClick={handleEditAccount}>
            Edit This Account
          </button>
          
          <button onClick={handleListAllAccounts}>
            List All Accounts
          </button>
          
          <button onClick={handleListRelatedAccounts}>
            List Related Accounts
          </button>
        </div>
      </section>
      
      {/* BALANCE AS OF DATE */}
      <section>
        <h2>Calculate Account Balance</h2>
        
        <div>
          <label>
            Calculate account balance as of:
          </label>
          
          <input
            type="date"
            value={balanceAsOfDate}
            onChange={(e) => setBalanceAsOfDate(e.target.value)}
          />
          
          <button onClick={handleCalculateBalance}>
            Calculate
          </button>
        </div>
        
        {calculatedBalance !== null && (
          <div>
            <p>
              Balance as of {balanceAsOfDate}: $
              {calculatedBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        )}
      </section>
      
      {/* DAILY BALANCES */}
      <section>
        <h2>Recent Daily Balances (Last 30 Days)</h2>
        
        {dailyBalances.length === 0 ? (
          <p>No daily balance data available.</p>
        ) : (
          <table>
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
                  {item.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                
                <td>
                  <button
                    onClick={() =>
                      handleQuickSearch(item.date)
                    }
                  >
                    Quick Search
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}