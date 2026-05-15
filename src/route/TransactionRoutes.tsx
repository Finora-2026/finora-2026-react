
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/notFound/NotFound.tsx";
import TransactionList from "../pages/finoraTransaction/TransactionList.tsx";
import TransactionUpdate from "../pages/finoraTransaction/TransactionUpdate.tsx";

export default function TransactionRoutes() {
  return (
    <Routes>
      <Route index element={<TransactionList />} />
      <Route path="list" element={<TransactionList />} />
      <Route path="add" element={<TransactionUpdate />} />
      <Route path="update/:groupId" element={<TransactionUpdate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}