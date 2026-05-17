import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "../pages/notFound/NotFound.tsx";
import AccountList from "../pages/finoraAccount/AccountList.tsx";
import AccountUpdate from "../pages/finoraAccount/AccountUpdate.tsx";
import AccountDetails from "../pages/finoraAccount/AccountDetails.tsx";

export default function AccountRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" replace />} />
      <Route path="list" element={<AccountList />} />
      <Route path="add" element={<AccountUpdate />} />
      <Route path="update/:accountId" element={<AccountUpdate />} />
      <Route path="details/:accountId" element={<AccountDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}