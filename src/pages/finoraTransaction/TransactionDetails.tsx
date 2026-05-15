import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Transaction = {
  id: string;
  date: string;
  typeId: string;
  brandId: string;
  amount: number;
  notes: string;
  bankId: string;
  posted: boolean;
};

export default function TransactionDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  
  const [loading] = useState(false);
  const [isRepeat] = useState(false);
  const [canEditGroup] = useState(true);
  
  const transactions: Transaction[] = [
    {
      id: "t1",
      date: "2026-01-01",
      typeId: "EXPENSE",
      brandId: "BR1",
      amount: 120.5,
      notes: "Mock transaction 1",
      bankId: "BANK1",
      posted: true,
    },
    {
      id: "t2",
      date: "2026-01-02",
      typeId: "INCOME",
      brandId: "BR2",
      amount: 250,
      notes: "Mock transaction 2",
      bankId: "BANK2",
      posted: false,
    },
  ];
  
  const getBrandName = (id: string) => {
    const map: Record<string, string> = {
      BR1: "Amazon",
      BR2: "Walmart",
    };
    return map[id] ?? id;
  };
  
  const getBankName = (id: string) => {
    const map: Record<string, string> = {
      BANK1: "Chase",
      BANK2: "Bank of America",
    };
    return map[id] ?? id;
  };
  
  const getAmountClass = (amount: number) => {
    return amount >= 0 ? "text-success" : "text-danger";
  };
  
  const markAsRepeat = (id: string) => {
    console.log("mark as repeat", id);
  };
  
  const repeatThisGroup = (id: string | undefined) => {
    console.log("repeat group", id);
  };
  
  const editButtonLabel = canEditGroup ? "Edit Group" : "View Only";
  
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        Transaction Group: {groupId}
      </h2>
      
      {/* Loading */}
      {loading && (
        <div className="text-center text-muted fs-5">
          Loading transaction group...
        </div>
      )}
      
      {/* No transactions */}
      {!loading && transactions.length === 0 && (
        <div className="text-center text-muted fs-5">
          No transactions found in this group.
        </div>
      )}
      
      {/* Table */}
      {transactions.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle shadow-sm bg-white">
            <thead className="table-primary text-center">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Brand</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Bank</th>
              <th>Status</th>
            </tr>
            </thead>
            
            <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className={tx.posted ? "table-success" : "table-warning"}
              >
                <td>{tx.date}</td>
                <td className="text-center">{tx.typeId}</td>
                <td>{getBrandName(tx.brandId)}</td>
                <td className={getAmountClass(tx.amount)}>
                  ${tx.amount.toFixed(2)}
                </td>
                <td style={{ maxWidth: "400px", whiteSpace: "pre-wrap" }}>
                  {tx.notes}
                </td>
                <td>{getBankName(tx.bankId)}</td>
                <td className="text-center">
                    <span
                      className={`badge ${
                        tx.posted ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {tx.posted ? "Posted" : "Pending"}
                    </span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Group actions */}
      <div className="btn-toolbar mb-3 flex-wrap justify-content-center gap-2">
        <button
          className="btn btn-primary"
          disabled={!canEditGroup}
          onClick={() => navigate(`/transaction-update/${groupId}`)}
        >
          {editButtonLabel}
        </button>
        
        <button
          className="btn btn-outline-secondary"
          disabled={isRepeat}
          onClick={() => markAsRepeat(groupId!)}
        >
          {isRepeat ? "Already Marked as Repeat" : "Mark as Repeat"}
        </button>
        
        <button
          className="btn btn-warning"
          onClick={() => repeatThisGroup(groupId)}
        >
          Repeat This Group
        </button>
      </div>
      
      {/* Navigation */}
      <div className="btn-toolbar flex-wrap justify-content-center gap-2">
        <button className="btn btn-outline-primary" onClick={() => navigate("/transaction-list")}>
          Posted Transactions
        </button>
        
        <button className="btn btn-outline-dark" onClick={() => navigate("/menu-user")}>
          Main Menu
        </button>
        
        <button className="btn btn-outline-warning" onClick={() => navigate("/transaction-pending-list")}>
          Pending Transactions
        </button>
      </div>
    </div>
  );
}