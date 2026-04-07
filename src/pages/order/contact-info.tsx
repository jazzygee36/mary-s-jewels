import HomeInput from "../../components/input";

const ContactInfo = () => {
  return (
    <form>
      <p className="text-[20px] text-[#101928] font-vastago font-semibold">
        Contact Information
      </p>
      <div className="mt-[20px] flex flex-col space-y-[10px] md:space-y-[20px]">
        <HomeInput
          type={"text"}
          label="Email Address"
          placeholder="Enter your email "
        />
        <div className="flex flex-col md:flex-row items-center gap-2">
          <HomeInput
            type={"text"}
            label="First Name"
            placeholder="Enter your first name "
          />
          <HomeInput
            type={"text"}
            label="Last Name"
            placeholder="Enter your last name "
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <HomeInput
            type={"text"}
            label="Phone Number"
            placeholder="Enter your phone number "
          />
          <HomeInput
            type={"text"}
            label="Shipping Number"
            placeholder="Enter your shipping number "
          />
        </div>
      </div>
      <p className="text-[20px] text-[#101928] font-vastago font-semibold mt-[23px]">
        Delivery Information
      </p>
      <div className="mt-[20px] flex flex-col space-y-[10px] md:space-y-[20px]">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <HomeInput
            type={"text"}
            label="Street No."
            placeholder="Enter your Street No. "
          />
          <HomeInput
            type={"text"}
            label="Apartment, Suite, Unit etc*"
            placeholder="Enter your apartment, suite, unit etc. "
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <HomeInput
            type={"text"}
            label="City"
            placeholder="Enter your city "
          />
          <HomeInput
            type={"text"}
            label="State"
            placeholder="Enter your state "
          />
        </div>
      </div>
    </form>
  );
};

export default ContactInfo;
