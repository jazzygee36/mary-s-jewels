import Grown from "../../assets/svg-img/crown.svg";
import Glass from "../../assets/svg-img/glass.svg";
import Delivery from "../../assets/svg-img/truck.svg";
import Card from "../../assets/svg-img/card-pos.svg";
import Earing from "../../assets/svg-img/webp/CategoryFrame.jpg"; 
import Ring from "../../assets/svg-img/webp/RingFrame.jpg";
import FrameWatch from "../../assets/svg-img/webp/FrameWatch.jpg";

const WhyShop = [
  {
    title: "Good Quality",
    description: "Our pieces are made to last, not fade after a few wears.",
    img: Grown,
  },
  {
    img: Glass,

    title: "Easy to Style",
    description: "Everything is designed to fit into your everyday life.",
  },
  {
    img: Delivery,
    title: "Fast Delivery",
    description: "We deliver across Nigeria, quickly and safely",
  },
  {
    img: Card,

    title: "Worth the Price",
    description: "You get premium feel without overspending.",
  },
];

const Categories = [
  {
    backgroundImg: Earing,
    title: "Earrings",
  },
  {
    backgroundImg: Ring,
    title: "Rings",
  },
  {
    backgroundImg: FrameWatch,
    title: "Watch",
  },
];

const Categoriest = () => {
  return (
    <div className="bg-[#E5E5E5] p-4 md:p-[48px] ">
      <div>
        <h1 className="text-[14px] md:text-[25px]  font-semibold font-geist  text-[#4C0213] mb-[30px]">
          Shop by Category
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[50px] mb-[50px]">
          {Categories.map((item, index) => (
            <div
              key={index}
              className="bg-cover bg-center bg-no-repeat h-[200px] md:h-[400px] w-full flex items-end justify-center rounded-2xl shadow-md pb-4 md:pb-6 relative overflow-hidden"
              style={{ backgroundImage: `url(${item?.backgroundImg})` }}>
              <div className="absolute inset-0 bg-black/20" />
              <h2 className="text-[14px] md:text-[24px] font-bold text-white relative z-10 border border-white px-4 py-2 rounded-lg w-full text-center mx-4">
                {item?.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-[14px] md:text-[25px]  font-semibold font-geist text-[#4C0213] mb-[30px]">
          Why Shop with us
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-[30px]">
          {WhyShop.map((item, index) => (
            <div
              key={index}
              className="bg-[#4C0213] p-4 md:p-[24px] rounded-2xl shadow-md ">
              <img src={item.img} alt={item.title} className="mb-[50px]" />
              <h2 className="text-[14px] md:text-[24px] font-bold text-[#ffffff] mb-[10px]">
                {item.title}
              </h2>
              <p className="text-[12px] md:text-[20px] text-[#ffffff] font-geists">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categoriest;
