import Facebook from "../../assets/svg-img/webp/Testimonials.jpg";
import Instagram from "../../assets/svg-img/webp/TestimonialsInstagram.webp.jpg";
import Tiktok from "../../assets/svg-img/webp/TestimonialsTiktok.webp.jpg";
import Twitter from "../../assets/svg-img/webp/TestimonialsFB.webp.jpg";

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
        Follow us on
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {FollowImg.map((item, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={item.Imag}
              alt={`Follow us ${index + 1}`}
              className="w-full transition-all duration-500 rounded-xl hover:opacity-90"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Follow;