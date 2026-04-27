import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home";
import AllCollection from "./pages/all-collections";
import ProductId from "./pages/product-id";
import OrderSummary from "./pages/order/order-summary";

import ProtectedRoute from "./auth/protected-route";
import SignUp from "./pages/account/sign-up";
import Login from "./pages/account/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/all-collections" element={<AllCollection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/order-summary" element={<OrderSummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
