
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/notFound/NotFound.tsx";
import TransactionUpdate from "../pages/finoraTransaction/TransactionUpdate.tsx";
import TransactionListPending from "../pages/finoraTransaction/TransactionListPending.tsx";

export default function TransactionRoutes() {
  return (
    <Routes>
      <Route index element={<TransactionListPending />} />
      <Route path="list-pending" element={<TransactionListPending />} />
      <Route path="add" element={<TransactionUpdate />} />
      <Route path="update/:groupId" element={<TransactionUpdate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}