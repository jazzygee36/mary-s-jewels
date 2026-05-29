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
  resetPwdFormData,
  type ResetPwdFormData,
} from "../../utils/validation";
import Toast from "../../components/toast";

import { confirmPassword } from "../../api/reset-password";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  // 1. FIXED: useSearchParams returns an array, destructure the first item
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPwdFormData>({
    resolver: zodResolver(resetPwdFormData),

    defaultValues: {
      token: token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: confirmPassword,
    onSuccess: (data) => {
      setToast({
        message: data?.message || "Password updated successfully! 🎉",
        type: "success",
      });

      setTimeout(() => navigate("/login"), 2000);
    },

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

  const onSubmit = (data: ResetPwdFormData) => {
    const { confirmPassword, ...apiPayload } = data;

    mutation.mutate(apiPayload);
  };

  return (
    <div className="bg-[#F5F4F0] min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="p-6 md:p-10 bg-white shadow-md rounded-lg">
            <button
              onClick={() => navigate(-1)}
              className="my-14 flex items-center gap-4 hover:opacity-70 transition-opacity"
            >
              <BackArrow /> <span className="font-medium">Back</span>
            </button>

            <h2 className="text-[18px] font-semibold mt-5 text-[#111111]">
              Reset Your Password
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex flex-col space-y-3"
            >
              <input type="hidden" {...register("token")} />

              <HomeInput
                type="password"
                label="New Password"
                placeholder="New Password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs">
                  {errors.newPassword.message}
                </p>
              )}

              <HomeInput
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/* BUTTON */}
              <HomeButton
                type="submit"
                title={mutation.isPending ? "Loading..." : "Update Password"}
                bg="#4C0213"
                className="text-white rounded-full py-3 mt-4"
                disabled={mutation.isPending}
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

export default ResetPassword;
