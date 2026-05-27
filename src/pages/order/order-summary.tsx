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
import { useState } from "react";
import Toast from "../../components/toast";
import { getUser } from "../../api/me";
import GlobalError from "../../components/global-error";
import Spinner from "../../components/spinner";

interface User {
  _id: string;
  email: string;
}

const OrderSummary = () => {
  const [loading, setLoading] = useState(false);

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

  //   mutationFn: verifyAndCreate,
  //   onSuccess: (data) => {
  //     setToast({
  //       message: data.message || "Order placed successfully 🎉",
  //       type: "success",
  //     });
  //   },
  //   onError: (error: any) => {
  //     const message =
  //       error?.response?.data?.message ||
  //       error?.message ||
  //       "Something went wrong ❌";

  //     setToast({ message, type: "error" });
  //   },
  // });

  const handlePayment = async (data: OrderFormData) => {
    if (!user?._id || !user?.email) {
      setToast({
        message: "Please login first",
        type: "error",
      });
      return;
    }

    if (!cartItems?.length) {
      setToast({
        message: "Cart is empty",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        customer: user._id,
        amount: subtotal,

        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),

        shipping: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          streetNumber: data.streetNumber,
          state: data.state,
          city: data.city,
          address: data.address,
        },
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/payments/initialize`, // Corrected URL string
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error("Payment initialization failed");
      }

      const result = await res.json();

      localStorage.setItem("payment_reference", result.reference);

      window.location.href = result.authorization_url;
    } catch (error: any) {
      setToast({
        message: error?.message || "Something went wrong initializing payment",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) return <Spinner />;
  if (isError) return <GlobalError onRetry={refetch} />;

  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 mt-[110px] gap-4 mx-auto w-[95%] md:w-[90%]">
        <div className="border border-[#E4E7EC] rounded-[11.67px] p-4 md:p-[25px] shadow flex flex-col gap-2 ">
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
                      // onClick={() => {
                      //   if (!item?._id) return;
                      //   window.location.href = `/product/${item._id.toLowerCase().replace(/\s+/g, "-")}`;
                      // }}
                      alt={item?.productName}
                      className="w-[100px] h-[100px] object-cover rounded-2xl"
                    />

                    <div>
                      <h3 className="font-semibold capitalize truncate w-[150px] md:w-[200px] text-[14px] md:text-[18px]">
                        {item?.productName}
                      </h3>

                      <p className="text-sm text-gray-500 truncate w-[150px] md:w-[270px]">
                        {item?.description}
                      </p>

                      <div className="flex gap-8 font-semibold item-center mt-6 bg-[#F5F5F5] w-[100%] md:w-[50%] rounded-[12px] py-[10px] px-1 items-center justify-center">
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
            className="hidden md:block text-white font-bold rounded-full py-3 mt-4 transition-all duration-300"
          />
        </div>

        <div className="border border-[#E4E7EC] rounded-[11.67px] p-4 md:p-[25px] shadow  rounded-xl">
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
