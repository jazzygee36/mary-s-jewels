import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home";
import AllCollection from "./pages/all-collections";
import ProductId from "./pages/product-id";
import OrderSummary from "./pages/order/order-summary";
import Account from "./pages/account/account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-collections" element={<AllCollection />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
