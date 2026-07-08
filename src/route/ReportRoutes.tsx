import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "../pages/notFound/NotFound.tsx";
import ReportList from "../pages/finoraReport/ReportList.tsx";


export default function ReportRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" replace />} />
      <Route path="list" element={<ReportList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}