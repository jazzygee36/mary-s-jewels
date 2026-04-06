import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home";
import AllCollection from "./pages/all-collections";
import ProductId from "./pages/product-id";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-collections" element={<AllCollection />} />
        <Route path="/product/:id" element={<ProductId />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
