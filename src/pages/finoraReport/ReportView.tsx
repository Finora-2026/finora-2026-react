import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { type ReportDetailsDto, reportService } from "../../utils/reportService.ts";
import { type TransactionGroupResponseDto, transactionGroupService} from "../../utils/transactionGroupService.ts";

import { useToast } from "../../components/ToastProvider/toastContext.ts";

import styles from "./Report.module.scss";

export default function ReportView() {
  
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [report, setReport] = useState<ReportDetailsDto | null>(null);
  const [loadingReport, setLoadingReport] = useState(true);
  
  const [transactionGroups, setTransactionGroups] = useState<TransactionGroupResponseDto[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingAllTransactions, setLoadingAllTransactions] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  
  useEffect(() => {
    const loadReport = async () => {
      
      if (!reportId) {
        return;
      }
      
      try {
        setLoadingReport(true);
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
        setLoadingReport(false);
      }
    };
    
    const loadTransactionGroups = async () => {
      if (!reportId) {
        return;
      }
      try {
        setLoadingGroups(true);
        const groups =
          await transactionGroupService.getGroupsByReportId(reportId);
        setTransactionGroups(groups);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load transaction groups";
        showToast(message, "error");
      } finally {
        setLoadingGroups(false);
      }
    };
    loadReport();
    loadTransactionGroups();
  }, [reportId, showToast]);
  
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  
  const handleDownloadReport = async () => {
    if (!reportId) return;
    
    try {
      setLoadingDownload(true);
      
      await reportService.downloadReportTransactions(reportId);
      
      showToast("Report downloaded successfully.", "success");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to download report";
      
      showToast(message, "error");
    } finally {
      setLoadingDownload(false);
    }
  };
  
  if (loadingReport || loadingGroups) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          Loading report details...
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

  const isPosted = report.reportStatus === "POSTED";

  const handleLoadAllTransactions = async () => {
    if (!reportId) return;

    try {
      setLoadingAllTransactions(true);
      const result = await reportService.loadAllTransactions(reportId);
      const [updatedReport, groups] = await Promise.all([
        reportService.getReportDetails(reportId),
        transactionGroupService.getGroupsByReportId(reportId),
      ]);

      setReport(updatedReport);
      setTransactionGroups(groups);
      showToast(
        `${result.loadedGroupCount} transaction group(s) loaded into the report.`,
        "success"
      );
    } catch (error: unknown) {
      const message = error instanceof Error
        ? error.message
        : "Failed to load transactions into report";
      showToast(message, "error");
    } finally {
      setLoadingAllTransactions(false);
    }
  };
  
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
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => navigate("../")}
          >
            List All Reports
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
              {report.typeSummary.length === 0 ? (
                <tr>
                  <td colSpan={3}>No type summary available.</td>
                </tr>
              ) : (
                report.typeSummary.map((summary) => (
                  <tr key={summary.transactionTypeId}>
                    <td>{summary.transactionTypeName}</td>
                    <td>{currencyFormatter.format(summary.totalAmount)}</td>
                    <td>—</td>
                  </tr>
                ))
              )}
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
              {report.accountSummary.length === 0 ? (
                <tr>
                  <td colSpan={3}>No account summary available.</td>
                </tr>
              ) : (
                report.accountSummary.map((account) => (
                  <tr key={account.accountId}>
                    <td>{account.accountName}</td>
                    <td>{account.accountType}</td>
                    <td>{currencyFormatter.format(account.balance)}</td>
                  </tr>
                ))
              )}
              </tbody>
            
            </table>
          </div>
        </div> {/* End of tablesContainer */}
        
        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            disabled={!reportId}
            onClick={() =>
              navigate("../../transactions/search", {
                state: { command: "searchReport", reportId },
              })
            }
          >
            Query (Search)
          </button>
          
          <button
            className={`${styles.button} ${styles.primary}`}
          >
            Report Summary
          </button>
          
          <button
            className={`${styles.button} ${styles.primary}`}
            disabled={!reportId || loadingDownload}
            onClick={handleDownloadReport}
          >
            {loadingDownload ? "Downloading..." : "Download Report"}
          </button>
        </div>
        
        {/* Table list all tx groups */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: "11%" }} />
              <col style={{ width: "9%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "35%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Account</th>
            </tr>
            </thead>
            <tbody>
            {transactionGroups.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  No transaction groups found.
                </td>
              </tr>
            ) : (
              transactionGroups.map((group) => (
                <>
                  <tr
                    key={group.id}
                    className={styles.groupRow}
                    onClick={() => navigate(`../../transactions/details/${group.id}`)}
                  >
                    <td colSpan={7}>
                      Group id: {group.id}
                      ({group.transactions.length} transactions)
                    </td>
                  </tr>
                  {group.transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className={styles.clickableRow}
                      onClick={() => navigate(`../../transactions/details/${group.id}`)}
                    >
                      
                      <td>
                        {tx.transactionDate.split("T")[0]}
                      </td>
                      <td>
                        {tx.transactionTypeId ?? "—"}
                      </td>
                      <td>
                        {tx.brandId ?? "—"}
                      </td>
                      <td>
                        {tx.locationId ?? "—"}
                      </td>
                      <td>
                        ${tx.amount.toFixed(2)}
                      </td>
                      <td>
                        {tx.notes ?? "—"}
                      </td>
                      <td>
                        {tx.accountId}
                      </td>
                    </tr>
                  ))}
                </>
              ))
            )}
            </tbody>
          </table>
        </div>
        
        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button
            className={`${styles.button} ${styles.secondary}`}
            disabled={!reportId || loadingAllTransactions}
            onClick={handleLoadAllTransactions}
          >
            {loadingAllTransactions ? "Loading transactions..." : "Load transactions"}
          </button>
          
          <button
            className={`${styles.button} ${styles.secondary}`}
          >
            Remove transactions
          </button>
          
          <button
            className={`${styles.button} ${styles.danger}`}
            disabled={isPosted}
          >
            Finalize report
          </button>
          
          <button
            className={`${styles.button} ${styles.danger}`}
            disabled={isPosted}
          >
            Delete report
          </button>
        </div>
      </div>
    </div>
  );
}
