
export default function ReportList() {
  
  // Temporary mocking data for now
  const reports = [
    { id: 1, month: "2026 June", status: "Posted" },
    { id: 2, month: "2026 May", status: "Posted" },
    { id: 3, month: "2026 April", status: "Pending" },
    { id: 4, month: "2026 March", status: "Posted" },
  ];
  
  return (
    <div>
      <div>
        <h1>Report List</h1>
        
        {/* Quick Actions */}
        <div>
          <button>Current Report / New Report</button>
          <button>Last Posted Report</button>
        </div>
        
        {/* Summary */}
        <div>
          <p>Available posted transactions: 127</p>
          <button>View</button>
        </div>
        
        {/* Year Filter */}
        <div>
          <button>2026</button>
          <button>2025</button>
          <button>2024</button>
        </div>
        
        <div>
          <input
            type="number"
            placeholder="Enter year"
          />
          <button>Search</button>
        </div>
        
        {/* Report Table */}
        <table>
          <thead>
          <tr>
            <th>Month</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          
          <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              onClick={() => {}}
              style={{ cursor: "pointer" }}
            >
              <td>{report.month}</td>
              <td>{report.status}</td>
              <td>
                <button onClick={() => {}}>
                  View
                </button>
                
                <button onClick={() => {}}>
                  Download
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}