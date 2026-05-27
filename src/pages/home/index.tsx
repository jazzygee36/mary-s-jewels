import Banner from "../../assets/svg-img/webp/LandingPage.webp";
import HomeButton from "../../components/button";
import GroupWatch from "../../assets/svg-img/webp/Groupwatch.webp";
import About from "./about";
import Product from "../../components/product";
import Categoriest from "./categoriest";
import Testomonies from "./testimony";
import Follow from "../../components/follow";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // small delay fixes render timing issue
      }
    }
  }, [location]);
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <>
          <Header />
          <div className="w-[80%] md:w-full">
            <div className="text-center flex flex-col items-center justify-center  ">
              <h1 className="font-vastago text-[43px] md:text-[80px]  font-bold text-white leading-tight">
                Styles That Speaks for You
              </h1>

              <p className="text-[15px] md:text-[26px] font-[400] mt-[20px] md:mt-0 font-geist text-white max-w-[80%] md:max-w-2xl">
                Watches, jewellery, and everyday pieces that help you show up
                looking your best, without trying too hard.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-[20px] md:mt-[55px] w-full md:w-auto">
                <HomeButton
                  onClick={() => navigate("/all-collections")}
                  title={"Shop Now"}
                  bg={"#4C0213"}
                  className="py-[14px] px-[40px] text-white text-[17px] rounded-full font-semibold text-[15px] md:text-[17.5px] w-full md:w-auto"
                />
                <HomeButton
                  onClick={() => navigate("/all-collections")}
                  title={"See all Collections"}
                  bg={""}
                  className="bg-[#FFAA92] md:bg-transparent py-[14px] px-[40px] text-[17px] text-[#4C0213] md:text-white border border-white rounded-full font-semibold text-[15px] md:text-[17.5px] w-full md:w-auto"
                />
              </div>
            </div>
            <div className="flex items-center md:items-end justify-between absolute bottom-none left-0 mt-[70px] md:bottom-0 w-max md:w-full  px-[0px] md:px-[85px] py-[20px]">
              <p className="text-[14px] md:text-[16px] text-white font-geist">
                ©️2026. Mary’s Jewels & Watch. All Rights Reserved.
              </p>

              <img
                src={GroupWatch}
                alt="watch"
                className="w-[64px] md:w-[112px]"
              />
            </div>
          </div>
        </>
      </div>
      <div id="about">
        <About />
      </div>
      <div id="products">
        <Product />
      </div>

      <div id="collections">
        <Categoriest />
      </div>
      <Testomonies />
      <Follow />
      <Footer />
    </>
  );
};

export default Home;
