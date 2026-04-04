import Grown from "../../assets/svg-img/crown.svg";
import Glass from "../../assets/svg-img/glass.svg";
import Delivery from "../../assets/svg-img/truck.svg";
import Card from "../../assets/svg-img/card-pos.svg";
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

const Categoriest = () => {
  return (
    <div className="bg-[#E5E5E5] p-4 md:p-[48px] ">
      <div>
        <h1 className="text-[14px] md:text-[24px] md:text-[30px] font-semibold  text-[#4C0213] mb-[30px]">
          Shop by Category
        </h1>
      </div>
      <div>
        <h1 className="text-[14px] md:text-[24px] md:text-[30px] font-semibold font-geist text-[#4C0213] mb-[30px]">
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
