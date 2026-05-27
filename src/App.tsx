import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import AllCollection from "./pages/all-collections";
import ProductId from "./pages/product-id";
import OrderSummary from "./pages/order/order-summary";
import ProtectedRoute from "./auth/protected-route";
import SignUp from "./pages/account/sign-up";
import Login from "./pages/account/login";
import ScrollToTop from "./components/ScrollToTop";
import OrdersPage from "./pages/order-list";
import PaymentSuccess from "./pages/payment-success";
import TermsAndConditions from "./pages/terms-and-condition";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/terms-&-conditions" element={<TermsAndConditions />} />
        <Route path="/all-collections" element={<AllCollection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/order-summary" element={<OrderSummary />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/my-orders" element={<OrdersPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
