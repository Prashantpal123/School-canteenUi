import { useNavigate } from "react-router-dom";
import type { Order } from "../../models/index.js";

interface StudentStatsCardProps {
  orders: Order[];
}

const StudentStatsCard = ({ orders }: StudentStatsCardProps) => {
  const navigate = useNavigate();

  const averageOrderValue =
    orders.length > 0 ? Math.round(orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length) : 0;

  const totalItemsOrdered = orders.reduce((sum, order) => sum + order.items.length, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600">
          <p className="text-xs md:text-sm text-gray-600 mb-2">Average Order Value</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">
            ₹{averageOrderValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 md:p-6 border-l-4 border-purple-600">
          <p className="text-xs md:text-sm text-gray-600 mb-2">Total Items Ordered</p>
          <p className="text-2xl md:text-3xl font-bold text-purple-600">{totalItemsOrdered}</p>
        </div>

        <button
          onClick={() => navigate("/snacks")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 md:py-3 rounded-lg transition transform hover:scale-105 mt-6 text-sm md:text-base"
        >
          Place New Order
        </button>
      </div>
    </div>
  );
};

export default StudentStatsCard;