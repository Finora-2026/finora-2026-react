import { useState } from "react";

type TransactionResult = {
  id: string;
  groupId: string;
  date: string;
  typeName: string;
  brandName: string;
  locationName: string;
  amount: number;
  notes: string;
  bankName: string;
};

export default function TransactionSearch() {
  const [loading] = useState(false);
  const [searched] = useState(true);
  
  // Mock dropdown data
  const banks = [
    { id: "1", name: "Chase" },
    { id: "2", name: "Bank of America" },
  ];
  
  const brands = [
    { id: "1", name: "Amazon" },
    { id: "2", name: "Walmart" },
  ];
  
  const locations = [
    { id: "1", city: "Dallas", state: "TX" },
    { id: "2", city: "Plano", state: "TX" },
  ];
  
  const transactionTypes = [
    { id: "1", name: "Food" },
    { id: "2", name: "Shopping" },
  ];
  
  // Mock results
  const results: TransactionResult[] = [
    {
      id: "TXN-001",
      groupId: "GRP-001",
      date: "2026-05-18",
      typeName: "Food",
      brandName: "McDonald's",
      locationName: "Dallas, TX",
      amount: -12.45,
      notes: "Lunch",
      bankName: "Chase",
    },
    {
      id: "TXN-002",
      groupId: "GRP-002",
      date: "2026-05-17",
      typeName: "Shopping",
      brandName: "Amazon",
      locationName: "Plano, TX",
      amount: -89.99,
      notes: "Keyboard purchase",
      bankName: "Bank of America",
    },
  ];
  
  // Mock handlers
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search clicked");
  };
  
  const onReset = () => {
    console.log("Reset clicked");
  };
  
  const openTransactionGroup = (groupId: string) => {
    console.log("Open transaction group:", groupId);
  };
  
  return (
    <div className="container">
      <h2>Search Transactions</h2>
      
      {/* SEARCH FORM */}
      <form onSubmit={onSearch}>
        <div className="row">
          {/* Date Range */}
          <div>
            <label>Start Date</label>
            <input type="date" />
          </div>
          
          <div>
            <label>End Date</label>
            <input type="date" />
          </div>
          
          {/* Amount Range */}
          <div>
            <label>Min Amount</label>
            <input type="number" step="0.01" />
            <small>* Can be negative (e.g., -50.00)</small>
          </div>
          
          <div>
            <label>Max Amount</label>
            <input type="number" step="0.01" />
          </div>
          
          {/* Bank Dropdown */}
          <div>
            <label>Bank</label>
            
            <select>
              <option value="">-- Select Bank --</option>
              
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Bank Dropdown */}
          <div>
            <label>Account</label>
            
            <select>
              <option value="">-- Select Bank --</option>
              
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Brand Dropdown */}
          <div>
            <label>Brand</label>
            
            <select>
              <option value="">-- Select Brand --</option>
              
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Location Dropdown */}
          <div>
            <label>Location</label>
            
            <select>
              <option value="">-- Select Location --</option>
              
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}, {location.state}
                </option>
              ))}
            </select>
          </div>
          
          {/* Type Dropdown */}
          <div>
            <label>Type</label>
            
            <select>
              <option value="">-- Select Type --</option>
              
              {transactionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Keyword */}
          <div>
            <label>Notes contains</label>
            
            <input
              type="text"
              placeholder="Search notes..."
            />
          </div>
        </div>
        
        <button type="submit">Search</button>
        
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </form>
      
      {/* RESULTS */}
      <div>
        <h4>Results ({results.length})</h4>
        
        {/* Loading State */}
        {loading && <div>Loading transactions...</div>}
        
        {/* No Results */}
        {!loading && searched && results.length === 0 && (
          <div>No transactions found.</div>
        )}
        
        {/* Results Table */}
        {!loading && results.length > 0 && (
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Bank</th>
            </tr>
            </thead>
            
            <tbody>
            {results.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() =>
                  openTransactionGroup(transaction.groupId)
                }
              >
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.typeName}</td>
                <td>{transaction.brandName}</td>
                <td>{transaction.locationName}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.notes}</td>
                <td>{transaction.bankName}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}