import { Link } from "react-router-dom";

const EmptyOrders = () => {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[32px] p-10 text-center shadow-lg border border-white/40 mt-10">
      <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#4C0213] flex items-center justify-center text-white text-5xl shadow-xl">
        💎
      </div>

      <h2 className="text-3xl font-bold text-[#222] mt-8">No Orders Yet</h2>

      <p className="text-[#7A7A7A] mt-4 max-w-md mx-auto leading-7">
        Looks like you haven’t made any purchases yet. Explore our luxury
        collections and find something timeless.
      </p>

      <Link to="/all-collections">
        <button className="mt-8 bg-[#4C0213] hover:bg-[#35010d] transition-all text-white px-8 py-4 rounded-full shadow-lg">
          Start Shopping
        </button>
      </Link>
    </div>
  );
};

export default EmptyOrders;
