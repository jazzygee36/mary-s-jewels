import Facebook from "../assets/svg-img/Fb-SocialIcons.svg";
import Tiktok from "../assets/svg-img/TikTokSocialIcons.svg";
import Instagram from "../assets/svg-img/InstagramLogo.svg";
import Call from "../assets/svg-img/call.svg";
const Footer = () => {
  return (
    <div className="bg-[#F0F0F0] p-4 md:p-[60px] mt-[50px]">
      <h1 className="text-[16px] md:text-[32px] font-vastago font-bold text-[#4C0213]">
        Mary’s Jewels & Watches
      </h1>
      <div className="w-full md:w-[35%] py-4 md:py-[28px]">
        <span className="text-[#1C1817] font-geist text-[14px] md:text-[16px] leading-tight">
          <span className="font-bold">Nigeria Office:</span> Gl gate shop, LB
          03, trade fair complex, Lagos, Nigeria. 
        </span>
      </div>
      <div className="mb-[60px] flex flex-col gap-4 md:gap-[10px]">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={Facebook} alt="fb" />
          <p>mary’sjewelsandwatches</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={Instagram} alt="fb" />
          <p>mary’sjewelsandwatches</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={Tiktok} alt="fb" />
          <p>mary’sjewelsandwatches</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={Call} alt="fb" />
          <p>mary’sjewelsandwatches</p>
        </div>
      </div>

      <hr />
      <div className="flex items-center justify-between mt-[28px] text-[#736965] font-geist text-[11px] md:text-[16px] ">
        <p>Privacy Policy</p>
        <p>©Mary’s Jewels & Watches 2026</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
};

export default Footer;
