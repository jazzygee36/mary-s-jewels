import { useState } from "react";
import HomeButton from "../../components/button";
import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import HomeInput from "../../components/input";
import BackArrow from "../../assets/icons/back-arrow";
import SignUp from "../sign-up";

const Account = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="bg-[#F5F4F0] min-h-screen">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 m-0 md:mx-[80px] mt-[70px] md:mt-[50px] ">
        {/* LOGIN */}
        <div
          onClick={() => setActiveTab("login")}
          className={`p-4 md:p-[90px] cursor-pointer transition-all duration-300 ${
            activeTab === "login" ? "bg-white shadow-md" : "bg-transparent"
          }`}>
          <BackArrow />
          <h2 className="text-[#111111] text-[18px] md:text-[28px] font-vastago font-semibold mt-[40px]">
            Login
          </h2>

          <p className="text-[#4B4B4B] text-[14px] hidden md:block">
            Enter your personal data to access your account.
          </p>

          <form className="mt-[20px] flex flex-col space-y-[10px]">
            <HomeInput
              type="text"
              label="Email Address"
              placeholder="Email Address"
            />

            <HomeInput
              type="password"
              label="Password"
              placeholder="Password"
            />

            <HomeButton
              title="Login"
              bg="#4C0213"
              className="text-white rounded-[100px] py-[14px] mt-4"
            />
            <div className="text-[14px] md:text-[16px] font-geist  text-center  my-[22px]">
              Lost your password? <span className="font-semibold">Recover</span>
            </div>
          </form>
        </div>

        {/* REGISTER */}
        <div
          onClick={() => setActiveTab("register")}
          className={`hidden md:block p-4 md:p-[90px] w-full cursor-pointer transition-all duration-300 ${
            activeTab === "register" ? "bg-white shadow-md" : "bg-transparent"
          }`}>
          <SignUp />
        </div>
      </div>

      <Follow />
      <Footer />
    </div>
  );
};

export default Account;
