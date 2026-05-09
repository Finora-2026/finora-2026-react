import {useEffect} from "react";
import {Link, Route, Routes} from "react-router-dom";
import NotFound from "../notFound/NotFound.tsx";

// Mock sub-components
const FinoraDashboard = () => <div>Finora Dashboard Content</div>;
const FinoraAnalytics = () => <div>Finora Analytics Content</div>;

export default  function FinoraPage() {

  useEffect(() => {
    document.title = 'Bellamy Phan | Finora'
  }, [])

  return (
    <>
      <div style={{ display: 'flex' }}>
        {/* Internal Finora Sidebar */}
        <aside style={{ width: '200px', borderRight: '1px solid #ccc' }}>
          <nav>
            <ul>
              <li><Link to="">Overview</Link></li>
              <li><Link to="analytics">Analytics</Link></li>
            </ul>
          </nav>
        </aside>
      </div>

      {/* Internal Finora Content Viewport */}
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* This matches "/finora" exactly */}
          <Route index element={<FinoraDashboard />} />

          {/* This matches "/finora/analytics" */}
          <Route path="analytics" element={<FinoraAnalytics />} />

          {/* Handle error and all pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}