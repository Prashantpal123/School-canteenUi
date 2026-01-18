import { useNavigate } from "react-router-dom";

const EmptyOrderState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📦</div>
      <p className="text-lg md:text-xl text-gray-600 mb-6">No orders yet</p>
      <button
        onClick={() => navigate("/snacks")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition text-sm md:text-base"
      >
        Create First Order
      </button>
    </div>
  );
};

export default EmptyOrderState;