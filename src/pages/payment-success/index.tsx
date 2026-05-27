import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/app-context";
import Spinner from "../../components/spinner";
import Header from "../../components/header";
import Footer from "../../components/footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCartItems } = useAppContext(); // Get the clear cart function from your app context
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );

  // Ref prevents React 18 StrictMode from firing double parallel fetch requests in local dev
  const verificationStarted = useRef(false);
  const reference = searchParams.get("reference");

  useEffect(() => {
    // If there's no reference or we already started the request, step out
    if (!reference || verificationStarted.current) return;

    verificationStarted.current = true;

    const verifyUserPayment = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/verify?reference=${reference}`);

        if (!res.ok) {
          throw new Error("Payment verification endpoint returned an error");
        }

        const result = await res.json();
        console.log("Verification Server Response:", result);

        // Payment verified and backend successfully updated the database document status!
        setStatus("success");
        setCartItems([]); // Wipe frontend cart state clear
        localStorage.removeItem("payment_reference"); // Clear any cached reference strings
      } catch (error) {
        console.error("Verification Client Error:", error);
        setStatus("error");
      }
    };

    verifyUserPayment();
  }, [reference, setCartItems]);

  if (!reference) {
    return (
      <div className="p-12 text-center text-red-500 font-semibold">
        Error: Missing payment reference query context parameters.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />

      <div className="flex items-center justify-center flex-grow bg-gray-50 p-4 mt-[100px]">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          {status === "verifying" && (
            <div className="flex flex-col items-center gap-4 py-6">
              <Spinner />
              <h2 className="text-xl font-bold text-gray-800">
                Confirming your payment...
              </h2>
              <p className="text-gray-500 text-sm">
                Please wait a moment while we secure your order information. Do
                not refresh or close this page.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="py-4">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold text-green-600">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Thank you! Your transaction went through perfectly, and your
                order is currently being prepared for shipping.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-8 bg-[#4C0213] text-white px-6 py-3 rounded-full font-bold w-full shadow-md hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="py-4">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-red-600">
                Verification Pending
              </h2>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                We had trouble checking your transaction status immediately. If
                you received a debit alert, your order will update automatically
                in the background shortly.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-8 bg-gray-800 text-white px-6 py-3 rounded-full font-bold w-full transition-colors hover:bg-gray-700"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
