import AdditionIcon from "../../assets/additionIcon";
import SubtractionIcon from "../../assets/icons/subtraction";
import HomeButton from "../../components/button";
import { useAppContext } from "../../context/app-context";
import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import ContactInfo from "./contact-info";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, type OrderFormData } from "../../utils/validation";
import { useQuery } from "@tanstack/react-query";
// import { createOrder } from "../../api/create-order";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast";
import { getUser } from "../../api/me";
// import { createPayment } from "../../api/create-payment";
import GlobalError from "../../components/global-error";
import Spinner from "../../components/spinner";
import PaystackPop from "@paystack/inline-js";
import { useNavigate } from "react-router-dom";
// import PaystackPop from "@paystack/inline-js";

interface User {
  _id: string;
  email: string;
}

const OrderSummary = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { cartItems, decrementItem, incrementItem, subtotal, setCartItems } =
    useAppContext();

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: getUser,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const handlePayment = (data: OrderFormData) => {
    if (!user?._id || !user?.email) {
      setToast({ message: "Please login first", type: "error" });
      return;
    }

    if (!cartItems?.length) {
      setToast({ message: "Cart is empty", type: "error" });
      return;
    }

    const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!PAYSTACK_KEY) {
      setToast({ message: "Payment config missing", type: "error" });
      return;
    }

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: PAYSTACK_KEY,
      email: user.email,
      amount: subtotal * 100,

      metadata: {
        custom_fields: [
          {
            display_name: "User ID",
            variable_name: "userId",
            value: user._id,
          },
        ],
      },
      onSuccess: async (transaction) => {
        try {
          setLoading(true);
          setToast({ message: "Processing order...", type: "info" });

          const res = await fetch(
            "https://mary-s-jewels-backend.vercel.app/users/verify-and-create",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: transaction.reference,
                userId: user._id,
                shipping: data,
              }),
            },
          );

          const result = await res.json();

          if (!res.ok || !result?.order) {
            throw new Error("Order creation failed");
          }

          // clear BOTH storage + state
          localStorage.removeItem("cartItems");
          setCartItems([]);

          setToast({
            message: "Order placed successfully 🎉",
            type: "success",
          });

          navigate("/my-orders");
        } catch (err) {
          setToast({
            message: "Payment succeeded but order failed",
            type: "error",
          });
        } finally {
          setLoading(false);
        }
      },

      onCancel: () => {
        setToast({ message: "Payment cancelled", type: "info" });
      },
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <GlobalError onRetry={refetch} />;

  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-[110px] gap-4 mx-auto w-[95%] md:w-[90%]">
        <div className="border-none md:border border-[#E4E7EC] p-4 md:p-[25px] rounded-[11.67px] flex flex-col gap-2 ">
          <div className="flex gap-2 items-center">
            <p className="text-[14px] md:text-[20px] font-semibold">
              Order Summary
            </p>

            <div className="w-[23px] h-[23px] rounded-full bg-[#AC0453] text-white flex items-center justify-center text-[11px] font-bold">
              {cartItems?.length || 0}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            {cartItems?.length > 0 ? (
              (cartItems ?? []).map((item, index) => (
                <div key={index} className="flex justify-between mb-10">
                  <div className="flex gap-4">
                    <img
                      src={item?.image}
                      className="w-[100px] h-[100px] object-cover rounded-2xl"
                    />

                    <div>
                      <h3 className="font-semibold">{item?.productName}</h3>

                      <p className="text-sm text-gray-500">
                        {item?.description}
                      </p>

                      <div className="flex gap-3 mt-2">
                        <button onClick={() => decrementItem(index)}>
                          <SubtractionIcon />
                        </button>

                        <span>{item?.quantity || 1}</span>

                        <button onClick={() => incrementItem(index)}>
                          <AdditionIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ₦
                    {(
                      (item?.amount ?? 0) * (item?.quantity || 1)
                    ).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}

            <div className="border-t pt-4 flex justify-between">
              <p>Subtotal</p>
              <p>₦{subtotal?.toLocaleString()}</p>
            </div>
          </div>

          <HomeButton
            title={loading ? "Processing..." : "Place Order"}
            bg="#4C0213"
            disabled={loading || !cartItems?.length}
            onClick={handleSubmit(handlePayment)}
            className="hidden md:block text-white font-bold rounded-full"
          />
        </div>

        <div className="border p-4 rounded-xl">
          <ContactInfo
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            handlePayment={handlePayment}
          />
        </div>
      </div>

      <Follow />
      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default OrderSummary;
