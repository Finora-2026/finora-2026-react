import { useEffect } from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import NotFound from "../notFound/NotFound.tsx";
import FinoraMenu from "../finoraMenu/FinoraMenu.tsx";
import FinoraNavBar from "../../components/NavBar/NavBarFinora.tsx";
import AccountRoutes from "../../route/AccountRoutes.tsx";
import TransactionRoutes from "../../route/TransactionRoutes.tsx";

const FinoraAnalytics = () => <div className="p-10">Finora Analytics Content</div>;

export default function FinoraPage() {
  
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname;
    let subtitle = "";
    // Determine the subtitle based on the path
    if (path.includes("/accounts")) {
      subtitle = " | Accounts";
    } else if (path.includes("/transactions")) {
      subtitle = " | Transactions";
    } else if (path.includes("/analytics")) {
      subtitle = " | Analytics";
    }
    document.title = `Finora${subtitle}`;
  }, [location]); // Re-runs every time the URL changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <FinoraNavBar />

      <main>
        <Routes>
          {/* Main menu */}
          <Route index element={<FinoraMenu />} />
          
          {/* Modules */}
          <Route path="accounts/*" element={<AccountRoutes />} />
          <Route path="transactions/*" element={<TransactionRoutes />} />
          
          {/* Placeholder modules */}
          <Route path="analytics" element={<FinoraAnalytics />} />
          
          {/* Handle error pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}