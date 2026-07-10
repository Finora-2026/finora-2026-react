import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { type ReportDetailsDto, reportService } from "../../utils/reportService.ts";
import { useToast } from "../../components/ToastProvider/toastContext.ts";

import styles from "./Report.module.scss";

export default function ReportView() {
  
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [report, setReport] = useState<ReportDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadReport = async () => {
      
      if (!reportId) {
        return;
      }
      
      try {
        setLoading(true);
        const result = await reportService.getReportDetails(reportId);
        if (!result) {
          showToast("Report not found", "error");
          return;
        }
        setReport(result);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load report";
        showToast(message, "error");
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [reportId, showToast]);
  
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          Loading report...
        </div>
      </div>
    );
  }
  
  if (!report) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          Report not found
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <h1 className={styles.title}>
          Report View {report.month}
        </h1>
        
        <h1 className={styles.title}>
          Status: {report.reportStatus}
        </h1>
        
        
        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button
            className={`${styles.button} ${styles.secondary}`}
            disabled={!report.previousReportId}
            onClick={() =>
              navigate(`../view/${report.previousReportId}`)
            }
          >
            Go Previous
          </button>
          
          <button
            className={`${styles.button} ${styles.primary}`}
          >
            Report Summary
          </button>
          
          <button
            className={`${styles.button} ${styles.primary}`}
          >
            Download Report
          </button>
          
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => navigate("../")}
          >
            List Reports
          </button>
          
          <button
            className={`${styles.button} ${styles.secondary}`}
            disabled={!report.nextReportId}
            onClick={() =>
              navigate(`../view/${report.nextReportId}`)
            }
          >
            Go Next
          </button>
        </div>
        
        {/* Report summary tables */}
        <div className={styles.tablesContainer}>
          
          {/* Type Summary */}
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
              
              <tbody>
              </tbody>
            
            </table>
          </div>
          
          
          {/* Account Summary */}
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
              
              <tbody>
              </tbody>
            
            </table>
          </div>
        </div> {/* End of tablesContainer */}
        
        {/* Future transaction group component */}
        <p>Filter options (Type Filter, Account filter, notes, amount rage)</p>

        <p>Transaction Groups table (just like Posted Transaction layout)</p>

        <p>Action zone: Load all Transactions, Remove all Transactions, Filter/Sort Button (Route to Transaction Search)</p>

        <p>Danger zone (Cannot Undo): Posted this Report, Delete this Report </p>
      </div>
    </div>
  );
}