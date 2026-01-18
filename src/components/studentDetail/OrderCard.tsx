import type { Order } from "../../models/index.js";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs md:text-sm text-gray-600">Order ID</p>
          <p className="font-bold text-sm md:text-base text-gray-900 break-all">{order.id}</p>
        </div>
        <div className="text-left sm:text-center">
          <p className="text-xs md:text-sm text-gray-600">Order Date</p>
          <p className="font-bold text-sm md:text-base text-gray-900">
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
            {order.status}
          </span>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-4 overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 md:px-4 py-2 text-left font-bold text-gray-900">Snack Name</th>
              <th className="px-2 md:px-4 py-2 text-center font-bold text-gray-900">Qty</th>
              <th className="px-2 md:px-4 py-2 text-center font-bold text-gray-900">Price</th>
              <th className="px-2 md:px-4 py-2 text-right font-bold text-gray-900">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-2 md:px-4 py-3 text-gray-900 font-semibold">{item.snackName}</td>
                <td className="px-2 md:px-4 py-3 text-center text-gray-700">{item.quantity}</td>
                <td className="px-2 md:px-4 py-3 text-center text-gray-700">₹{item.price}</td>
                <td className="px-2 md:px-4 py-3 text-right text-gray-900 font-bold">
                  ₹{item.subtotal.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Total */}
      <div className="flex justify-end">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200 w-full sm:w-auto">
          <div className="flex justify-between sm:flex-col sm:items-end gap-4">
            <span className="font-bold text-gray-900 text-sm md:text-base">Order Total:</span>
            <span className="text-xl md:text-2xl font-bold text-green-600">
              ₹{order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;