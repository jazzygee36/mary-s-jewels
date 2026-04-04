import { useState } from "react";
import Product1 from "../../assets/svg-img/jewelry-stand.svg";
import Product2 from "../../assets/svg-img/beautiful-luxury.svg";
import Product3 from "../../assets/svg-img/jewelry-watch.svg";
import Product4 from "../../assets/svg-img/jewelry-watch.svg";
import Product5 from "../../assets/svg-img/luxury-necklace-jewelry.svg";
import Product6 from "../../assets/svg-img/jewelry-stand.svg";
import HomeButton from "../../components/button";

const ProductNav = [
  { title: "Trending", path: "/trending" },
  { title: "Best Sellers", path: "/best-sellers" },
  { title: "Popular", path: "/popular" },
];

const TrendingProducts = [
  {
    product: "Gold Chain Necklace",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product1,
  },
  {
    product: "Gold Chain Necklace",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product2,
  },
  {
    product: "Gold Chain Necklace",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product3,
  },
  {
    product: "Gold Chain Necklace",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product4,
  },
  {
    product: "Gold Chain Necklace",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product5,
  },
  {
    product: "Gold Chain Necklace",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product6,
  },
];

const Product = () => {
  const [activeTab, setActiveTab] = useState("/trending");

  return (
    <div className="p-4 md:p-[47px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {ProductNav.map((item, index) => (
            <span
              key={index}
              onClick={() => setActiveTab(item.path)}
              className={`text-[18px] text-[#76404E] font-geist cursor-pointer ${
                activeTab === item.path ? "font-bold" : ""
              }`}>
              {item.title}
            </span>
          ))}
        </div>

        <span className="text-[18px] text-[#303030] font-geist underline cursor-pointer">
          See all
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {TrendingProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2  rounded-2xl cursor-pointer">
            <div className="bg-[#E5E5E5] p-4 rounded-[13.74px] flex items-center justify-center pt-[26px] overflow-hidden">
              <img
                src={product.image}
                alt={product.product}
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div className="flex items-center justify-between my-[20px]">
              <div>
                <h3 className="text-[23px] text-[#303030] font-semibold font-geist">
                  {product.product}
                </h3>
                <p className="text-[17.3px] text-[#767676] font-geist">
                  {product.decription}
                </p>
              </div>

              <HomeButton
                title={`₦${product.price}`}
                bg={"#FFAA92"}
                className="text-[#1F1F1F] rounded-full px-[17px] py-[8px] md:py-[13px] transition-all duration-300  "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
