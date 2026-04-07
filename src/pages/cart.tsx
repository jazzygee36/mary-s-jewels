import { Link } from "react-router-dom";
import AdditionIcon from "../assets/additionIcon";
import SubtractionIcon from "../assets/icons/subtraction";
import HomeButton from "../components/button";
import { useAppContext } from "../context/app-context";

const Cart = () => {
  const {
    cartItems,
    quantity,
    increment,
    decrement,
    removeFromCart,
    subtotal,
  } = useAppContext();

  return (
    <div>
      <div className="flex flex-col gap-4 mt-8">
        {cartItems.length > 0 ? (
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
                      <h3 className="text-[#303030] text-[14px] md:text-[18px] font-semibold font-geist truncate w-[170px] md:w-[180px]  ">
                        {item.product}
                      </h3>

                      <p className="text-[#767676] text-[13px] md:text-[16px] font-geist truncate w-[170px] md:w-[200px]  ">
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

                <div className="flex flex-col justify-around">
                  <p className="text-[#303030] text-[18px] font-semibold font-geist">
                    ₦{item.price}
                  </p>

                  <HomeButton
                    title="Remove"
                    bg="#FFEEF1"
                    onClick={() => removeFromCart(index)}
                    className="text-[#F31E45] text-[13px] md:text-[16px] font-geist font-bold rounded-full px-[17px] py-[6px] md:py-[8px] transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#767676] text-[16px] font-geist">
            Your cart is empty
          </p>
        )}

        <div className="border-t border-[#767676]/35 py-4 flex items-center justify-between">
          <p className="text-[#303030] text-[18px] font-semibold font-geist">
            Subtotal
          </p>
          <span className="text-[#303030] text-[20px] font-semibold font-geist">
            ₦{subtotal}
          </span>
        </div>
        <Link to="/order-summary" className="block">
          {cartItems.length > 0 && (
            <div className=" ">
              <HomeButton
                title="Checkout"
                bg="#4C0213"
                className="py-[14px] rounded-full w-full text-white text-[16px] font-geist font-bold transition-all duration-300"
              />
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
