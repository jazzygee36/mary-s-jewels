import Facebook from "../../assets/svg-img/Testimonials.svg";
import Instagram from "../../assets/svg-img/TestimonialsInstagram.svg";
import Tiktok from "../../assets/svg-img/TestimonialsTiktok.svg";
import Twitter from "../../assets/svg-img/TestimonialsFB.svg";

const FollowImg = [
  { Imag: Facebook },
  { Imag: Instagram },
  { Imag: Tiktok },
  { Imag: Twitter },
];

const Follow = () => {
  return (
    <div className="mt-[50px] px-4 md:px-[48px]">
      <h1 className="text-[14px] md:text-[30px] text-center font-semibold font-geist text-[#4C0213] mb-[30px]">
        {" "}
        Follow us on
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-2">
        {FollowImg.map((item, index) => (
          <div key={index} className=" p-2 cursor-pointer">
            <img src={item.Imag} alt={`Follow us ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Follow;
