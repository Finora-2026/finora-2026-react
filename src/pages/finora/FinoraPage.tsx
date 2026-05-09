import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../notFound/NotFound.tsx";
import FinoraMenu from "../finoraMenu/FinoraMenu.tsx";
import FinoraNavBar from "../../components/NavBar/NavBarFinora.tsx";

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
          <Route index element={<FinoraMenu />} />
          <Route path="analytics" element={<FinoraAnalytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}