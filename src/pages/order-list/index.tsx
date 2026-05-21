import { useQuery } from "@tanstack/react-query";

import Spinner from "../../components/spinner";

import { getMyOrders } from "../../api/user-orders";
import OrderCard from "./order-card";
import EmptyOrders from "./empty-order";
import { getUser } from "../../api/me";
import Header from "../../components/header";

interface User {
  _id: string;
  email: string;
}

const OrdersPage = () => {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: getUser,
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["my-orders", user?._id],
    queryFn: () => getMyOrders(user!._id),
    enabled: !!user?._id,
  });

  if (isLoading || ordersLoading) return <Spinner />;

  if (isLoading) return <Spinner />;

  const hasOrders = orders?.length > 0;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F8F5F0] px-4 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* HERO */}
          <div className="">
            {/* <p className="text-sm uppercase tracking-[4px] opacity-70">
            Mary’s Jewels
          </p> */}

            <h1 className="text-xl md:text-3xl font-bold mt-10 text-transparent bg-clip-text bg-gradient-to-r from-[#4C0213] to-[#7A1733]">
              My Orders
            </h1>

            <p className="mt-4 text-black/80 max-w-xl">
              Track your luxury purchases and delivery progress in one place.
            </p>

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
              <p className="text-sm text-white/70">Total Orders</p>
              <h2 className="text-3xl font-bold">{orders?.length || 0}</h2>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
              <p className="text-sm text-white/70">Successful</p>
              <h2 className="text-3xl font-bold">
                {orders?.filter((o: any) => o.paymentStatus === "paid")
                  .length || 0}
              </h2>
            </div>
          </div> */}
          </div>

          {/* ORDERS */}
          <div className="mt-10">
            {hasOrders ? (
              <div className="flex flex-col gap-6">
                {orders.map((order: any) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            ) : (
              <EmptyOrders />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
