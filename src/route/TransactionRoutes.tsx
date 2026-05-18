
import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "../pages/notFound/NotFound.tsx";
import TransactionUpdate from "../pages/finoraTransaction/TransactionUpdate.tsx";
import TransactionListPending from "../pages/finoraTransaction/TransactionListPending.tsx";
import TransactionDetails from "../pages/finoraTransaction/TransactionDetails.tsx";
import TransactionListPosted from "../pages/finoraTransaction/TransactionListPosted.tsx";
import TransactionSearch from "../pages/finoraTransaction/TransactionSearch.tsx";
import TransactionListRepeat from "../pages/finoraTransaction/TransactionListRepeat.tsx";

export default function TransactionRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="list-pending" replace />} />
      <Route path="list-pending" element={<TransactionListPending />} />
      <Route path="list-posted" element={<TransactionListPosted />} />
      <Route path="list-repeat" element={<TransactionListRepeat />} />
      <Route path="search" element={<TransactionSearch />} />
      <Route path="add" element={<TransactionUpdate />} />
      <Route path="update/:groupId" element={<TransactionUpdate />} />
      <Route path="repeat/:groupId" element={<TransactionUpdate />} />
      <Route path="details/:groupId" element={<TransactionDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}