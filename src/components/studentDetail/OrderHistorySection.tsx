import type { Order } from "../../models/index.js";
import OrderCard from "./OrderCard.js";
import EmptyOrderState from "./EmptyOrderState.js";

interface OrderHistorySectionProps {
  orders: Order[];
}

const OrderHistorySection = ({ orders }: OrderHistorySectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

      {orders.length === 0 ? (
        <EmptyOrderState />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistorySection;