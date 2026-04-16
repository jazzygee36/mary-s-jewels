import HomeButton from "../../components/button";
import HomeInput from "../../components/input";
import BackArrow from "../../assets/icons/back-arrow";

const SignUp = () => {
  return (
    <div
      //   onClick={() => setActiveTab("register")}
      className={` p-4  md:p-0 w-full cursor-pointer transition-all duration-300`}>
      <BackArrow />

      <h2 className="text-[#111111] text-[28px] font-vastago font-semibold mt-[40px]">
        Register
      </h2>

      <p className="text-[#4B4B4B] text-[14px]">
        Enter your personal data to create your account.
      </p>

      <form className="mt-[20px] flex flex-col space-y-[10px]">
        <HomeInput
          type="text"
          label="Email Address"
          placeholder="Email Address"
        />

        <HomeInput type="password" label="Password" placeholder="Password" />

        <HomeInput
          type="text"
          label="Confirm Password"
          placeholder="Confirm Password"
        />

        <HomeButton
          title="Register"
          bg="#4C0213"
          className="text-white rounded-[100px] py-[14px] mt-4"
        />
      </form>
    </div>
  );
};

export default SignUp;
