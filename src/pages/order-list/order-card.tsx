interface OrderCardProps {
  order: any;
}
const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-[30px] p-6 hover:scale-[1.01] transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#7A7A7A]">ORDER ID</p>

          <h2 className="text-xl font-bold text-[#222]">#{order?.orderId}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            Payment Successful
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {order?.items?.map((item: any) => (
          <div key={item._id} className="flex items-center gap-4">
            <img
              src={item?.product?.image}
              className="w-24 h-24 rounded-2xl object-cover shadow-md"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {item?.product?.productName}
              </h3>

              <p className="text-[#7A7A7A]">Qty: {item?.quantity}</p>

              <p className="text-[#4C0213] font-bold text-lg mt-2">
                ₦{Number(item?.product?.amount ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DELIVERY TRACKER */}
      <div className="mt-8">
        <div className="flex justify-between text-sm">
          <span>Processing</span>
          <span>Shipped</span>
          <span>Delivered</span>
        </div>

        <div className="relative mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-[70%] bg-gradient-to-r from-[#D4AF37] to-[#4C0213]" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-5">
        <div>
          <p className="text-sm text-[#7A7A7A]">Total Paid</p>

          <h2 className="text-2xl font-bold text-[#222]">
            ₦{Number(order?.total ?? 0).toLocaleString()}
          </h2>
        </div>

        <button className="bg-[#4C0213] hover:bg-[#35010d] transition-all text-white px-6 py-3 rounded-full">
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
