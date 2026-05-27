import HomeButton from "../../components/button";
import HomeInput from "../../components/input";

interface ContactInfoProps {
  register: any;
  handleSubmit: any;
  handlePayment: any;
  errors: any;
}

import { clsx } from "clsx";
const ContactInfo = ({
  register,
  handleSubmit,
  handlePayment,
  errors,
}: ContactInfoProps) => {
  return (
    <form onSubmit={handleSubmit(handlePayment)}>
      <p className="text-[20px] text-[#101928] font-vastago font-semibold">
        Contact Information
      </p>
      <div className="mt-[20px] flex flex-col space-y-[10px] md:space-y-[20px]">
        <HomeInput
          type={"text"}
          label="Email Address"
          placeholder="Enter your email "
          {...register("email")}
          className={clsx(
            "border",
            errors.email ? "border-red-500" : "border-[#D0D5DD]",
          )}
        />

        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <HomeInput
            type={"text"}
            label="First Name"
            placeholder="Enter your first name "
            {...register("firstName")}
            className={clsx(
              "border",
              errors.firstName ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
          <HomeInput
            type={"text"}
            label="Last Name"
            placeholder="Enter your last name "
            {...register("lastName")}
            className={clsx(
              "border",
              errors.lastName ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          {/* <HomeInput
            type="tel"
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
              },
            })}
            className={clsx(
              "border",
              errors.phoneNumber ? "border-red-500" : "border-[#D0D5DD]",
            )}
          /> */}
          <HomeInput
            type="text"
            label="Phone Number"
            placeholder="Enter your Phone Number"
            {...register("phoneNumber", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            })}
            className={clsx(
              "border",
              errors.phoneNumber ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
          <HomeInput
            type={"text"}
            label="Delivery number"
            placeholder="Enter delivery number "
            {...register("shippingNumber")}
            className={clsx(
              "border",
              errors.shippingNumber ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
        </div>
      </div>
      <p className="text-[20px] text-[#101928] font-vastago font-semibold mt-[23px]">
        Delivery Information
      </p>
      <div className="mt-[20px] flex flex-col space-y-[10px] md:space-y-[20px]">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <HomeInput
            type="text"
            label="Street No."
            placeholder="Enter your Street No."
            {...register("streetNumber", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            })}
            className={clsx(
              "border",
              errors.streetNumber ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
          <HomeInput
            type={"text"}
            label="Apartment, Suite, Unit etc*"
            placeholder="Enter your apartment, suite, unit etc. "
            {...register("address")}
            className={clsx(
              "border",
              errors.address ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <HomeInput
            type={"text"}
            label="City"
            placeholder="Enter your city "
            {...register("city")}
            className={clsx(
              "border",
              errors.city ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
          <HomeInput
            type={"text"}
            label="State"
            placeholder="Enter your state "
            {...register("state")}
            className={clsx(
              "border",
              errors.state ? "border-red-500" : "border-[#D0D5DD]",
            )}
          />
        </div>
        <HomeButton
          title="Place Order"
          bg="#4C0213"
          onClick={() => handleSubmit(handlePayment)()}
          className="block md:hidden text-white mt-4 text-[13px] md:text-[16px] font-geist font-bold rounded-full px-[17px] py-[6px] md:py-[8px] transition-all duration-300"
        />
      </div>
    </form>
  );
};

export default ContactInfo;
