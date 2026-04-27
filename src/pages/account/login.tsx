import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import HomeButton from "../../components/button";
import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import HomeInput from "../../components/input";
import BackArrow from "../../assets/icons/back-arrow";

import { UserLogin } from "../../api/login";
import { loginFormSchema, type LoginFormData } from "../../utils/validation";
import Toast from "../../components/toast";

const Login = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const mutation = useMutation({
    mutationFn: UserLogin,
    onSuccess: (data) => {
      setToast({
        message: data.message || "Login successful",
        type: "success",
      });

      if (data.accessToken) {
        sessionStorage.setItem("token", data.accessToken);
        navigate("/order-summary");
      }
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

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-[#F5F4F0] min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="p-6 md:p-10 bg-white shadow-md rounded-lg">
            <BackArrow />

            <h2 className="text-[18px] md:text-[28px] font-semibold mt-5">
              Login
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 flex flex-col space-y-3">
              {/* EMAIL */}
              <HomeInput
                type="text"
                label="Email Address"
                placeholder="Email Address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}

              {/* PASSWORD */}
              <HomeInput
                type="password"
                label="Password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}

              {/* BUTTON */}
              <HomeButton
                title={mutation.isPending ? "Logging in..." : "Login"}
                bg="#4C0213"
                className="text-white rounded-full py-3 mt-4"
              />
            </form>

            <div className="text-sm text-center my-5">
              Lost your password? <span className="font-semibold">Recover</span>
            </div>
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

export default Login;
