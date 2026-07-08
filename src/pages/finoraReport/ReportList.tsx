import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {type ReportDto, reportService} from "../../utils/reportService.ts";
import { transactionGroupService } from "../../utils/transactionGroupService";
import { useToast } from "../../components/ToastProvider/toastContext.ts";

import styles from "./Report.module.scss";

// Temporary mocking data for now
const reports = [
  { id: 1, month: "2026 June", status: "Posted" },
  { id: 2, month: "2026 May", status: "Posted" },
  { id: 3, month: "2026 April", status: "Pending" },
  { id: 4, month: "2026 March", status: "Posted" },
];

export default function ReportList() {
  
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [currentPendingReport, setCurrentPendingReport] = useState<ReportDto | null>(null);
  const [loadingCurrentReport, setLoadingCurrentReport] = useState(true);

  const [lastPostedReport, setLastPostedReport] = useState<ReportDto | null>(null);
  const [loadingLastPostedReport, setLoadingLastPostedReport] = useState(true);

  const [availableGroupCount, setAvailableGroupCount] = useState<number>(0);
  const [loadingCount, setLoadingCount] = useState(true);

  // Load last posted report button
  useEffect(() => {
    const loadLastPostedReport = async () => {
      try {
        setLoadingLastPostedReport(true);
        const report = await reportService.getLastPostedReport();
        setLastPostedReport(report);
      } catch (error: unknown) {
        console.error(error);
        setLastPostedReport(null);
      } finally {
        setLoadingLastPostedReport(false);
      }
    };
    loadLastPostedReport();
  }, []);

  // Load current pending report
  useEffect(() => {
    const loadCurrentPendingReport = async () => {
      try {
        setLoadingCurrentReport(true);
        const report = await reportService.getCurrentPendingReport();
        setCurrentPendingReport(report);
      } catch (error: unknown) {
        console.error(error);
        setCurrentPendingReport(null);
      } finally {
        setLoadingCurrentReport(false);
      }
    };
    loadCurrentPendingReport();
  }, []);

  // Load available transaction groups for reporting
  useEffect(() => {
    const loadAvailableGroupCount = async () => {
      try {
        setLoadingCount(true);
        const groups = await transactionGroupService.getAvailableReportGroups();
        // Count transaction groups
        setAvailableGroupCount(groups.length);
      } catch (error: unknown) {
        console.error(error);
        const message =
            error instanceof Error
                ? error.message
                : "Failed to load available transaction groups";
        showToast(message, "error");
        setAvailableGroupCount(0);
      } finally {
        setLoadingCount(false);
      }
    };
    loadAvailableGroupCount();
  }, [showToast]);
  
  const goToPostedTransactions = () => {
    navigate("/finora/transactions/list-posted");
  };
  
  const handleNotImplemented = (featureName: string) => {
    showToast(`${featureName} is not implemented yet`, "error");
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Report List</h1>
        
        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            disabled={loadingCurrentReport}
            onClick={() => handleNotImplemented(
              currentPendingReport ? "Current Report" : "New Report"
            )}
          >
            {loadingCurrentReport
              ? "Loading..."
              : currentPendingReport
                ? "Current Report"
                : "New Report"}
          </button>
          <button
            className={`${styles.button} ${styles.secondary}`}
            disabled={loadingLastPostedReport || !lastPostedReport}
            onClick={() => handleNotImplemented("Last Posted Report")}
          >
            {loadingLastPostedReport
              ? "Loading..."
              : lastPostedReport
                ? "View Last Report"
                : "No Posted Report"}
          </button>
        </div>
        
        {/* Summary */}
        <div className={styles.summary}>
          <p>
            Available posted transaction groups:{" "}
            {loadingCount ? "Loading..." : availableGroupCount}
          </p>
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={goToPostedTransactions}
          >
            View
          </button>
        </div>
        
        {/* Year Filter */}
        <div className={styles.yearFilter}>
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => handleNotImplemented("Year 2026")}>
            2026
          </button>
          
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => handleNotImplemented("Year 2025")}>
            2025
          </button>
          
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => handleNotImplemented("Year 2024")}>
            2024
          </button>
        </div>
        
        <div className={styles.yearSearch}>
          <input
            className={styles.input}
            type="number"
            placeholder="Enter year"
          />
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => handleNotImplemented("Year Search")}>
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
                onClick={() => handleNotImplemented("Report Row Click")}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotImplemented("View Report");
                      }}
                    >
                      View
                    </button>
                    
                    <button
                      className={`${styles.button} ${styles.primary}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotImplemented("Download Report");
                      }}
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