import { useState } from "react";
import Product1 from "../assets/svg-img/webp/jewelry-stand.webp";
import Product2 from "../assets/svg-img/webp/beautiful-luxury.webp";
import Product3 from "../assets/svg-img/webp/jewelry-watch.webp";
// import Product4 from "../assets/svg-img/webp/jewelry-watch.webp";

import Product5 from "../assets/svg-img/webp/luxury-necklace-jewelry.webp";

import HomeButton from "./button";
import { Link } from "react-router-dom";

interface ProductProps {
  seeAll?: boolean;
  className?: string;
}

const ProductNav = [
  { title: "Trending", path: "/trending" },
  { title: "Best Sellers", path: "/best-sellers" },
  { title: "Popular", path: "/popular" },
];

const TrendingProducts = [
  {
    product: "Gold Chain Necklace",
    decription: "Simple, bold, and easy to style.",
    price: "20,000",
    image: Product1,
  },
  {
    product: "Minimal Ring Set",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product2,
  },
  {
    product: "A timeless piece only for you",
    decription: "Simple, bold, and easy to style.",
    price: "28,000",
    image: Product3,
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
    image: Product5,
  },
  {
    product: "Minimal Ring Set",
    decription: "Simple, bold, and easy to style.",
    price: "98,000",
    image: Product1,
  },
];

const Product = ({ seeAll = true, className }: ProductProps) => {
  const [activeTab, setActiveTab] = useState("/trending");

  return (
    <div className={`p-4 md:p-[47px] ${className}`}>
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

        {seeAll && (
          <Link to="/all-collections">
            <span className="text-[18px] text-[#303030] font-geist underline cursor-pointer">
              See all
            </span>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {TrendingProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2  rounded-2xl cursor-pointer">
            <Link
              to={`/product/${product.product.toLowerCase().replace(/\s+/g, "-")}`}
              state={{ product }} // <-- pass the product object
            >
              <div className="bg-[#E5E5E5] p-4 rounded-[13.74px] flex items-center justify-center pt-[26px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.product}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
            </Link>

            <div className="flex items-center justify-between my-[20px]">
              <div>
                <h3 className="text-[19px] text-[#303030] font-semibold font-geist">
                  {product.product}
                </h3>
                <p className="text-[13px] text-[#767676] font-geist">
                  {product.decription}
                </p>
              </div>

              <HomeButton
                title={`₦${product.price}`}
                bg={"#FFAA92"}
                className="text-[#1F1F1F] text-[13px] font-bold rounded-full px-[17px] py-[6px] md:py-[8px] transition-all duration-300  "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
