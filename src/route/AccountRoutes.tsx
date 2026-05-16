import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "../pages/notFound/NotFound.tsx";
import AccountList from "../pages/finoraAccount/AccountList.tsx";
import AccountCreate from "../pages/finoraAccount/AccountCreate.tsx";

export default function AccountRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" replace />} />
      <Route path="list" element={<AccountList />} />
      <Route path="add" element={<AccountCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}