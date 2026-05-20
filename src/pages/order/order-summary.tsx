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
import { useMutation, useQuery } from "@tanstack/react-query";
// import { createOrder } from "../../api/create-order";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast";
import { getUser } from "../../api/me";
// import { createPayment } from "../../api/create-payment";
import GlobalError from "../../components/global-error";
import Spinner from "../../components/spinner";
import PaystackPop from "@paystack/inline-js";
// import PaystackPop from "@paystack/inline-js";

interface User {
  _id: string;
  email: string;
}

const OrderSummary = () => {
  // const navigate = useNavigate();
  const { cartItems, decrementItem, incrementItem, subtotal } = useAppContext();
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: getUser,
  });
  console.log("User data:", user);
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

  const verifyPayment = async (reference: string) => {
    try {
      const res = await fetch("http://localhost:5000/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }),
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //   mutationFn: createOrder,
  //   onSuccess: (data) => {
  //     setToast({
  //       message: data.message || "Order placed successfully",
  //       type: "success",
  //     });
  //     localStorage.removeItem("cartItems");
  //     setCartItems([]);
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1500); // 1.5 seconds

  //     console.log("Order creation response:", data);
  //   },
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   onError: (error: any) => {
  //     const message =
  //       error?.response?.data?.message ||
  //       error?.message ||
  //       "Something went wrong ❌";

  //     setToast({
  //       message,
  //       type: "error",
  //     });
  //   },
  // });

  // const paymentMutation = useMutation({
  //   mutationFn: createPayment,
  //   onSuccess: (data) => {
  //     window.location.href = data?.data?.cashierUrl;
  //   },
  // });

  const handlePayment = async (data: OrderFormData) => {
    if (!user?._id || !user?.email) return;

    try {
      const paystack = new PaystackPop();
      const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

      if (!PAYSTACK_KEY) {
        throw new Error("Missing Paystack public key");
      }

      paystack.newTransaction({
        key: PAYSTACK_KEY,

        email: user.email,

        amount: subtotal * 100,

        currency: "NGN",

        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: data.email,
            },
          ],
          cartItems,
          shipping: data,
          subtotal,
        },
        onSuccess: async (transaction: { reference: string }) => {
          console.log(transaction);

          const result = await verifyPayment(transaction.reference);

          const isSuccess =
            result?.status === true ||
            result?.data?.status === "success" ||
            result?.success === true;
          if (isSuccess) {
            setToast({
              message: "Payment verified 🎉",
              type: "success",
            });
          } else {
            setToast({
              message: "Payment verification failed",
              type: "error",
            });
          }
        },

        onCancel: () => {
          setToast({
            message: "Payment cancelled",
            type: "info",
          });
        },
      });
    } catch (error) {
      console.log(error);

      setToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div>
        <GlobalError onRetry={refetch} />
      </div>
    );
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[110px] gap-4 mx-auto w-[95%] md:w-[90%]">
        <div className="border-none md:border border-[#E4E7EC] p-4 md:p-[25px] rounded-[11.67px] flex flex-col gap-2 ">
          <div className="  flex gap-2 items-center">
            <p className="text-[14px] md:text-[20px] text-[#101928] font-vastago font-semibold">
              Order Summary
            </p>
            <div className="w-[23.43px] h-[24.65px] rounded-full bg-[#AC0453] text-white flex items-center justify-center text-white text-[11px] font-bold">
              {cartItems?.length}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between w-full rounded-2xl mb-10">
                    <div className="flex gap-2 md:gap-8">
                      <img
                        src={item?.image}
                        alt={item?.productName}
                        className="bg-[#E5E5E5] rounded-2xl w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover p-0"
                      />

                      <div className="flex flex-col w-full justify-between">
                        <div>
                          <h3 className="text-[#303030] text-[14px] md:text-[18px] font-semibold font-geist truncate w-[150px] md:w-[180px]  ">
                            {item?.productName}
                          </h3>

                          <p className="text-[#767676] text-[10px] md:text-[13px] font-geist truncate w-[150px] md:w-[200px]  ">
                            {item?.description}
                          </p>
                        </div>

                        <div className="bg-[#F5F5F5] w-[80%] md:w-full rounded-[12px] py-1 px-6 flex items-center justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => decrementItem(index)}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                          >
                            <SubtractionIcon />
                          </button>

                          <span className="text-[20px] font-bold text-[#303030] font-geist mx-2">
                            {item?.quantity || 1}
                          </span>

                          <button
                            type="button"
                            onClick={() => incrementItem(index)}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                          >
                            <AdditionIcon />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col ">
                      <p className="text-[#303030] text-[18px] font-semibold font-geist">
                        ₦
                        {(
                          (item?.amount ?? 0) * (item?.quantity || 1)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex flex-col gap-4">
              <div className="border-t border-[#767676]/35 py-4 flex items-center justify-between">
                <p className="text-[#303030] text-[16px] font-normal font-geist">
                  Subtotal
                </p>
                <span className="text-[#303030] text-[18px] font-semibold font-geist">
                  ₦{subtotal?.toLocaleString()}
                </span>
              </div>

              <div className="border-t border-[#767676]/35 py-4 flex items-center justify-between">
                <p className="text-[#303030] text-[16px] font-normal font-geist">
                  Shipping
                </p>
                <span className="text-[#303030] text-[14px] md:text-[18px] font-semibold font-geist">
                  Enter shipping <br className="block md:hidden" /> details
                  first
                </span>
              </div>
            </div>
            <HomeButton
              title="Place Order"
              bg="#4C0213"
              onClick={() => handleSubmit(handlePayment)()}
              // onClick={() => removeFromCart(index)}
              className="hidden md:block text-white text-[13px] md:text-[16px] font-geist font-bold rounded-full px-[17px] py-[6px] md:py-[8px] transition-all duration-300"
            />
          </div>
        </div>

        <div className="border-none md:border border-[#E4E7EC] p-4 md:p-[25px] rounded-[11.67px]">
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
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default OrderSummary;
