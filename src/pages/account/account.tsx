import HomeButton from "../../components/button";
import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import HomeInput from "../../components/input";

const Account = () => {
  return (
    <div className="bg-[#F5F4F0]">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 m-4 md:mx-[80px] mt-[80px] ">
        <div className="bg-white p-4 md:p-[90px]">
          <h2 className="text-[#111111] text-[28px] font-vastago font-semibold">
            Login
          </h2>
          <p className="text-[#4B4B4B] text-[14px]">
            Enter your personal data to create your account.
          </p>

          <form className="mt-[20px] flex flex-col space-y-[10px] md:space-y-[10px] mt-4">
            <HomeInput
              type={"text"}
              label="Email Address"
              placeholder="Email Address"
            />
            <HomeInput
              type={"password"}
              label="Password"
              placeholder="Password"
            />
            <HomeButton
              title={"Login"}
              bg={"#4C0213"}
              className="text-white rounded-[100px] py-[14px] mt-4"
            />
          </form>
        </div>
        <div>
          <div className="p-4 md:p-[90px]">
            <h2 className="text-[#111111] text-[28px] font-vastago font-semibold">
              Register
            </h2>
            <p className="text-[#4B4B4B] text-[14px]">
              Enter your personal data to create your account.
            </p>

            <form className="mt-[20px] flex flex-col space-y-[10px] md:space-y-[10px] mt-4">
              <HomeInput
                type={"text"}
                label="Email Address"
                placeholder="Email Address"
              />
              <HomeInput
                type={"password"}
                label="Password"
                placeholder="Password"
              />
              <HomeInput
                type={"text"}
                label="Confirm Password"
                placeholder="Confirm Password"
                className=""
              />
              <HomeButton
                title={"Register"}
                bg={"#4C0213"}
                className="text-white rounded-[100px] py-[14px] mt-4"
              />
            </form>
          </div>
        </div>
      </div>
      <Follow />
      <Footer />
    </div>
  );
};

export default Account;
