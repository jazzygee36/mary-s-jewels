const Testimonials = [
  {
    title: "Tolu, Lagos",
    description: "Exactly what I wanted. It looks even better in real life.",
  },
  {
    title: "Daniel, Abuja",
    description: "Everything is designed to fit into your everyday life.",
  },
  {
    title: "Selina, Port Harcourt",
    description: "We deliver across Nigeria, quickly and safely",
  },
  {
    title: "Amaka, Port Harcourt",
    description: "You get premium feel without overspending.",
  },
  {
    title: "Emeka, Lagos",
    description: "You get premium feel without overspending.",
  },
];

const Testomonies = () => {
  return (
    <div className="bg-[#F5F5F5] p-4 md:p-[48px] overflow-hidden">
      <h1 className="text-[14px] md:text-[30px] font-semibold font-geist text-[#4C0213] mb-[30px]">
        What our Customers are Saying
      </h1>

     
      <div className="overflow-hidden mb-[30px]">
        <div className="flex gap-6 animate-slide-right w-max">
          {[...Testimonials, ...Testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white p-6 rounded-2xl shadow-md"
            >
              <h2 className="text-[16px] font-bold text-black mb-[10px]">
                {item.title}
              </h2>
              <p className="text-[14px] text-black mt-[20px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    
      <div className="overflow-hidden">
        <div className="flex gap-6 animate-slide-left w-max">
          {[...Testimonials, ...Testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white p-6 rounded-2xl shadow-md"
            >
              <h2 className="text-[16px] font-bold text-black mb-[10px]">
                {item.title}
              </h2>
              <p className="text-[14px] text-black mt-[20px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testomonies;