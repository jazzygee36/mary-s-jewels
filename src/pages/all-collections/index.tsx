import BackArrow from "../../assets/icons/back-arrow";
import FilterAccordion from "../../components/accordion";

import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Product from "../../components/product";

const AllCollection = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] mt-[85px] md:mt-[60px]">
        <div className="flex items-center gap-2 block md:hidden">
          <BackArrow className="ml-[3%] flex items-center" />
          {/* <span className="text-[#000000] text-[16px] font-semibold">Back</span> */}
        </div>

        {/* Sidebar */}
        <div className="py-10 px-4 md:sticky md:top-0 md:h-screen md:pl-[10%] md:pr-4">
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
          <div className="flex items-center gap-2  hidden md:block w-full">
            <BackArrow className="ml-[3%] flex items-center" />
            {/* <span className="text-[#000000] text-[16px] font-semibold">
              Back
            </span> */}
          </div>
          <Product seeAll={false} />
        </div>
      </div>

      <Follow />
      <Footer />
    </>
  );
};

export default AllCollection;
