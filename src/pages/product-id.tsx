import { useState } from "react";
import { useLocation } from "react-router-dom";
import HomeButton from "../components/button";
import SubtractionIcon from "../assets/icons/subtraction";
import AdditionIcon from "../assets/additionIcon";
import Product from "../components/product";
import Follow from "../components/follow";
import Footer from "../components/footer";
import Cart from "./cart";
import RightDrawer from "../components/drawer";
import { useAppContext } from "../context/app-context";

const colors = [
  { name: "Black" },
  { name: "Gold" },
  { name: "Silver" },
];

const ProductId = () => {
  const {
    addToCart,
    cartItems,
    quantity,
    increment,
    decrement,
    drawerOpen,
    setDrawerOpen,
  } = useAppContext();

  const location = useLocation();
  const product = location.state?.product;

  const [selectedColor, setSelectedColor] = useState("Black");

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  const isAddedToCart = cartItems.some(
    (item) =>
      item.product === product.product &&
      item.color === selectedColor
  );

  const handleCartClick = () => {
    if (isAddedToCart) {
      setDrawerOpen(true);
      return;
    }

    addToCart({
      ...product,
      price: Number(product.price),
      color: selectedColor,
      quantity,
    });
  };

  return (
    <>
      <div className="p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.product}
            className="w-[250px] h-[262px] md:w-[377px] md:h-[396px] object-cover rounded-2xl mx-auto"
          />

          {/* Product Details */}
          <div className="flex flex-col gap-12">
            <div>
              <h1 className="text-[24px] md:text-[32px] font-normal text-[#303030] font-geist">
                {product.product}
              </h1>

              <span className="text-[36px] font-bold font-vastago text-[#4C0213]">
                ₦{Number(product.price).toLocaleString()}
              </span>

              <p className="text-[20px] text-[#404041] font-geist">
                {product.decription}
              </p>
            </div>

            {/* Color Selector */}
            <div className="flex items-center gap-4">
              {colors.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedColor(item.name)}
                  className={`rounded-lg py-[10px] px-[15px] flex items-center justify-center cursor-pointer border border-[#3A3D38]/18 transition ${
                    selectedColor === item.name
                      ? "bg-[#3A3D38] text-white font-bold"
                      : "bg-[#F8F5F0] text-[#303030]"
                  }`}
                >
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              {/* Quantity Selector */}
              <div className="bg-[#F5F5F5] w-full rounded-[12px] py-4 px-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={decrement}
                  className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                >
                  <SubtractionIcon />
                </button>

                <span className="text-[20px] font-bold text-[#303030] font-geist mx-2">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increment}
                  className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                >
                  <AdditionIcon />
                </button>
              </div>

              {/* Add to Cart Button */}
              <HomeButton
                onClick={handleCartClick}
                className={`w-full py-4 text-white rounded-full font-bold transition ${
                  isAddedToCart
                    ? "bg-gray-400 cursor-pointer"
                    : "bg-[#4C0213] hover:opacity-80"
                }`}
                title={isAddedToCart ? "Go to Cart" : "Add to Cart"}
                bg=""
              />
            </div>
          </div>
        </div>
      </div>

      <Product seeAll={false} className="hidden md:block" />
      <Follow />
      <Footer />

      {/* Cart Drawer */}
      <RightDrawer
        title={`${cartItems.length} item${
          cartItems.length > 1 ? "s" : ""
        } in cart`}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Cart />
      </RightDrawer>
    </>
  );
};

export default ProductId;