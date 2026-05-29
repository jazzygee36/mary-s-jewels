import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HomeButton from "../../components/button";
import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import HomeInput from "../../components/input";
import BackArrow from "../../assets/icons/back-arrow";

import {
  recoveryFormSchema,
  type RecoveryFormSchema,
} from "../../utils/validation";
import Toast from "../../components/toast";

import { forgetPassword } from "../../api/forget-password";

const ForgetPassword = () => {
  const [message, setMessage] = useState("");

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormSchema>({
    resolver: zodResolver(recoveryFormSchema),
  });

  const mutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      setToast({
        message: data.message || "Reset link has been sent to your email",
        type: "success",
      });
      setMessage(data?.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong ❌";

      setToast({
        message,
        type: "error",
      });
    },
  });

  const onSubmit = (data: RecoveryFormSchema) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-[#F5F4F0] min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="p-6 md:p-10 bg-white shadow-md rounded-lg">
            <div className="my-14 flex items-center gap-4">
              <BackArrow /> <span className="font-medium">Back</span>
            </div>

            <div className="text-green-700 font-semibold underline">
              {message}.
            </div>
            <h2 className="text-[18px] md:text-[18px] font-semibold mt-5 text-[#111111]">
              Recover your password
            </h2>
            <p className="text-[12px] text-[#4B4B4B]">
              We’ll send instructions to your email to rectify it
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex flex-col space-y-3"
            >
              <HomeInput
                type="text"
                label="Email Address"
                placeholder="Email Address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}

              {/* BUTTON */}
              <HomeButton
                type="submit"
                title={mutation.isPending ? "Loading..." : "Recover Password"}
                bg="#4C0213"
                className="text-white rounded-full py-3 mt-4"
                // onClick={() => {
                //   onSubmit();
                // }}
              />
            </form>
          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Follow />
      <Footer />
    </div>
  );
};

export default ForgetPassword;
