import AdditionIcon from "../../assets/additionIcon";
import SubtractionIcon from "../../assets/icons/subtraction";
import HomeButton from "../../components/button";
import { useAppContext } from "../../context/app-context";
import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import ContactInfo from "./contact-info";

const OrderSummary = () => {
  const { cartItems, quantity, increment, decrement, subtotal } =
    useAppContext();
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
              1
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between w-full rounded-2xl mb-10">
                    <div className="flex gap-2 md:gap-8">
                      <img
                        src={item.image}
                        alt={item.product}
                        className="bg-[#E5E5E5] rounded-2xl w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover p-4"
                      />

                      <div className="flex flex-col w-full justify-between">
                        <div>
                          <h3 className="text-[#303030] text-[14px] md:text-[18px] font-semibold font-geist truncate w-[150px] md:w-[180px]  ">
                            {item.product}
                          </h3>

                          <p className="text-[#767676] text-[10px] md:text-[13px] font-geist truncate w-[150px] md:w-[200px]  ">
                            {item.decription}
                          </p>
                        </div>

                        <div className="bg-[#F5F5F5] w-[80%] md:w-full rounded-[12px] py-1 px-6 flex items-center justify-center gap-4">
                          <button
                            type="button"
                            onClick={decrement}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200">
                            <SubtractionIcon />
                          </button>

                          <span className="text-[20px] font-bold text-[#303030] font-geist mx-2">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={increment}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200">
                            <AdditionIcon />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col ">
                      <p className="text-[#303030] text-[18px] font-semibold font-geist">
                        ₦{item.price}
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
                  ₦{subtotal}
                </span>
              </div>

              <div className="border-t border-[#767676]/35 py-4 flex items-center justify-between">
                <p className="text-[#303030] text-[16px] font-normal font-geist">
                  Shipping
                </p>
                <span className="text-[#303030] text-[18px] font-semibold font-geist">
                  Enter shipping <br className="block md:hidden" /> details
                  first
                </span>
              </div>
            </div>
            <HomeButton
              title="Place Order"
              bg="#4C0213"
              // onClick={() => removeFromCart(index)}
              className="text-white text-[13px] md:text-[16px] font-geist font-bold rounded-full px-[17px] py-[6px] md:py-[8px] transition-all duration-300"
            />
          </div>
        </div>

        <div className="border-none md:border border-[#E4E7EC] p-4 md:p-[25px] rounded-[11.67px]">
         
          <ContactInfo />
        </div>
      </div>
      <Follow />
      <Footer />
    </div>
  );
};

export default OrderSummary;
