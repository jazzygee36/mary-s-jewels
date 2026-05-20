import { useState } from "react";
import BackArrow from "../../assets/icons/back-arrow";
import FilterAccordion from "../../components/accordion";

import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Product from "../../components/product";
import { getAllProducts } from "../../api/all-products";
import { useQuery } from "@tanstack/react-query";
import GlobalError from "../../components/global-error";
import Spinner from "../../components/spinner";
import { Link } from "react-router-dom";
import HomeButton from "../../components/button";
const ProductNav = [
  { title: "Trending", value: "trending" },
  { title: "Best Sellers", value: "best-selling" },
  { title: "Popular", value: "popular" },
] as const;

const AllCollection = () => {
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

  const filteredProducts = allproducts?.filter((p) => p.category === activeTab);

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
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 mt-[85px] md:mt-[60px]">
        <div className="flex md:hidden items-center gap-2 w-full px-2">
          <BackArrow />
          <span className="text-[#000000] text-[16px] font-semibold">Back</span>
        </div>

        {/* Sidebar */}
        <div className="py-3 md:py-10 px-4 md:sticky md:top-0 md:h-screen md:pl-[10%] md:pr-4">
          <FilterAccordion
            sections={[
              {
                title: "Collections",
                options: ["New Arrivals", "Bestsellers", "On Sale", "Popular"],
              },
              {
                title: "Type",
                options: ["Watches", "Rings", "Necklaces", "Bracelets"],
              },
              {
                title: "Price",
                options: [
                  "N20,000 - N50,000",
                  "N50,000 - N100,000",
                  "Over N100,000",
                ],
              },
            ]}
          />
        </div>

        {/* Products */}
        <div className=" md:mt-[40px] w-full">
          <div className="hidden md:flex items-center gap-2 w-full">
            <BackArrow />
            <span className="text-[#000000] text-[14px] font-semibold">
              Back
            </span>
          </div>
          <div className="flex items-center gap-4 mt-0 md:mt-8 p-4 md:">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 p-4 md:p-0">
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
                      <p className="text-[13px] text-[#767676] font-geist truncate w-[200px]">
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
      </div>

      <Follow />
      <Footer />
    </>
  );
};

export default AllCollection;
