
import styles from "./Report.module.scss";

export default function ReportList() {
  
  // Temporary mocking data for now
  const reports = [
    { id: 1, month: "2026 June", status: "Posted" },
    { id: 2, month: "2026 May", status: "Posted" },
    { id: 3, month: "2026 April", status: "Pending" },
    { id: 4, month: "2026 March", status: "Posted" },
  ];
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Report List</h1>
        
        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button className={`${styles.button} ${styles.primary}`}>
            Current Report / New Report
          </button>
          <button className={`${styles.button} ${styles.secondary}`}>
            Last Posted Report
          </button>
        </div>
        
        {/* Summary */}
        <div className={styles.summary}>
          <p>Available posted transactions: 127 (Mocking)</p>
          <button className={`${styles.button} ${styles.secondary}`}>
            View
          </button>
        </div>
        
        {/* Year Filter */}
        <div className={styles.yearFilter}>
          <button className={`${styles.button} ${styles.secondary}`}>
            2026
          </button>
          
          <button className={`${styles.button} ${styles.secondary}`}>
            2025
          </button>
          
          <button className={`${styles.button} ${styles.secondary}`}>
            2024
          </button>
        </div>
        
        <div className={styles.yearSearch}>
          <input
            className={styles.input}
            type="number"
            placeholder="Enter year"
          />
          <button className={`${styles.button} ${styles.primary}`}>
            Search
          </button>
        </div>
        
        {/* Report Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            
            <colgroup>
              <col style={{ width: "40%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "35%" }} />
            </colgroup>
            
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
                className={styles.clickableRow}
                onClick={() => {}}
              >
                <td>{report.month}</td>
                <td>
                  <span className={`${styles.badge} ${report.status === "Posted"
                        ? styles.badgeSuccess
                        : styles.badgeWarning}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.button} ${styles.secondary}`}
                      onClick={(e) => {e.stopPropagation();}}
                    >
                      View
                    </button>
                    
                    <button
                      className={`${styles.button} ${styles.primary}`}
                      onClick={(e) => {e.stopPropagation();}}
                    >
                      Download
                    </button>
                  
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}