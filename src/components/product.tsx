import { useState } from "react";

import HomeButton from "./button";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/all-products";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./spinner";
import GlobalError from "./global-error";

interface ProductProps {
  seeAll?: boolean;
  className?: string;
  category: "trending" | "best-selling" | "popular";
}

const ProductNav = [
  { title: "Trending", value: "trending" },
  { title: "Best Sellers", value: "best-selling" },
  { title: "Popular", value: "popular" },
] as const;

interface Product {
  _id: string;
  image: string;
  productName: string;
  category: string;
  amount: string;
  description?: string;
  stock: string;
}

const Product = ({ seeAll = true, className }: ProductProps) => {
  const {
    data: allproducts,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const [activeTab, setActiveTab] = useState<
    "trending" | "best-selling" | "popular"
  >("trending");

  const filteredProducts = allproducts
    ?.filter((p) => p.category === activeTab)
    .slice(0, 6);

  if (isError)
    return <GlobalError message="Failed to load products" onRetry={refetch} />;

  if (isLoading)
    return (
      <p>
        <Spinner />
      </p>
    );

  if (isError)
    return <GlobalError message="Failed to load products" onRetry={refetch} />;

  return (
    <div id="products" className={`p-4 md:p-[47px] ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {ProductNav.map((item, index) => (
            <span
              key={index}
              onClick={() => setActiveTab(item.value)}
              className={`text-[18px] text-[#76404E] font-geist cursor-pointer ${
                activeTab === item.value && "font-bold  "
              }`}
            >
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          filteredProducts?.map((product, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2  rounded-2xl cursor-pointer"
            >
              <Link
                to={`/product/${product?._id.toLowerCase().replace(/\s+/g, "-")}`}
                state={{ product }} // <-- pass the product object
              >
                <div className="bg-[#E5E5E5] rounded-[13.74px] h-[250px] overflow-hidden">
                  <img
                    src={product?.image}
                    alt={product?.productName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </Link>

              <div className="flex items-center justify-between my-[20px]">
                <div>
                  <h3 className="text-[19px] text-[#303030] font-semibold font-geist truncate w-[200px]">
                    {product?.productName}
                  </h3>
                  <p className="text-[13px] text-[#767676] font-geist truncate w-[230px]">
                    {product?.description}
                  </p>
                </div>

                <HomeButton
                  title={`₦${Number(product?.amount || 0).toLocaleString()}`}
                  bg={"#FFAA92"}
                  className="text-[#1F1F1F] text-[13px] font-bold rounded-full px-[17px] py-[6px] md:py-[8px] transition-all duration-300  "
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
