import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../notFound/NotFound.tsx";
import FinoraMenu from "../finoraMenu/FinoraMenu.tsx";
import FinoraNavBar from "../../components/NavBar/NavBarFinora.tsx";
import AccountRoutes from "../../route/AccountRoutes.tsx";

const FinoraAnalytics = () => <div className="p-10">Finora Analytics Content</div>;

export default function FinoraPage() {
  useEffect(() => {
    document.title = 'Bellamy Phan | Finora';
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <FinoraNavBar />

      <main>
        <Routes>
          {/* Main menu */}
          <Route index element={<FinoraMenu />} />
          
          {/* Modules */}
          <Route path="accounts/*" element={<AccountRoutes />} />
          
          {/* Placeholder modules */}
          <Route path="analytics" element={<FinoraAnalytics />} />
          
          {/* Handle error pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}