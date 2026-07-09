
import styles from "./Report.module.scss";

export default function ReportView() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Report View 2026 June</h1>
        <h1 className={styles.title}>Status: NEW | PENDING | POSTED | EMPTY</h1>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button className={`${styles.button} ${styles.secondary}`}>Go Previous</button>
          <button className={`${styles.button} ${styles.primary}`}>Report Summary</button>
          <button className={`${styles.button} ${styles.primary}`}>Download Report</button>
          <button className={`${styles.button} ${styles.secondary}`}>List Reports</button>
          <button className={`${styles.button} ${styles.secondary}`}>Go Next</button>
        </div>

        {/* Report summary tables */}
        <div className={styles.tablesContainer}>
          {/* Left Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "60%" }} />
              </colgroup>
              <thead>
              <tr>
                <th>Type Name</th>
                <th>Balance</th>
                <th>Type Notes</th>
              </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          {/* Right Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "40%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <thead>
              <tr>
                <th>Account Name</th>
                <th>Type</th>
                <th>Balance</th>
              </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div> {/* End of tablesContainer */}

        <p>Filter options (Type Filter, Account filter, notes, amount rage)</p>

        <p>Transaction Groups table (just like Posted Transaction layout)</p>

        <p>Action zone: Load all Transactions, Remove all Transactions, Filter/Sort Button (Route to Transaction Search)</p>

        <p>Danger zone (Cannot Undo): Posted this Report, Delete this Report </p>
      </div>
    </div>
  );
}