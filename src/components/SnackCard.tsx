import { useState, useEffect } from "react";
import type { Snack} from "../models/Snack.js";
import { useOrder } from "../context/OrderContext.js";
import { getStudents } from "../api/canteenApi.js";
import type { Student, OrderItem } from "../models/index.js";

interface SnackCardProps {
  snack: Snack;
}

const SnackCard = ({ snack }: SnackCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { placeOrder } = useOrder();

  useEffect(() => {
    // Load students from API
    getStudents()
      .then((data) => {
        setStudents(data);
        if (data.length > 0) {
          setSelectedStudent(data[0]?.id ?? "");
        }
      })
      .catch((error) => {
        console.error("Error loading students:", error);
      });
  }, []);

  const handlePlaceOrderClick = () => {
    setShowDialog(true);
  };

  const handleConfirmOrder = async () => {
    if (!selectedStudent) {
      alert("Please select a student");
      return;
    }

    setLoading(true);
    try {
      const student = students.find((s) => s.id === selectedStudent);
      if (!student) {
        alert("Student not found");
        return;
      }

      // Create order item with the snack details
      const orderItem: OrderItem = {
        snackId: snack.id,
        snackName: snack.name,
        quantity,
        price: snack.price,
        subtotal: snack.price * quantity,
      };

      // Create order with single item directly
      await placeOrder(selectedStudent, student.name || "Student", [orderItem]);

      setShowDialog(false);
      setQuantity(1);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition flex flex-col">
      
      {/* Image */}
      <div className="relative">
        <img
          src={snack.image || "/snack-placeholder.jpg"}
          alt={snack.name}
          className="h-44 w-full object-cover rounded-t-xl"
        />

        {/* Veg badge */}
        <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-semibold">
          VEG
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
          {snack.name}
        </h3>
              

              <div className="flex justify-between"> 
        {/* Rating */}
        <div className="flex items-center gap-2 mt-1 text-sm">
          <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
            ★ {snack.rating || 4.3}
          </span>
          <span className="text-gray-500">
            ({snack.ordersCount || 0} orders)
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 text-lg font-bold text-gray-900">
          ₹{snack.price}
          <span className="text-sm text-gray-500 font-normal"> / item</span>
        </div>

        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between mt-4">
          

          
        </div>

        {/* Button */}
        <button
          onClick={handlePlaceOrderClick}
          className="mt-4 w-full py-2 rounded-lg font-semibold transition border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          Place Order
        </button>

        {/* Dialog Popup */}
        {showDialog && (
          <div className="fixed inset-0  bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-sm">
              {/* Header */}
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Create Order: {snack.name}
              </h2>

              {/* Student Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Student
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">-- Choose a student --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} (ID: {student.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, val));
                    }}
                    className="w-16 text-center border border-gray-300 rounded-lg py-2 px-2 font-semibold"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per item:</span>
                  <span className="font-semibold text-gray-900">₹{snack.price}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Quantity:</span>
                  <span className="font-semibold text-gray-900">{quantity}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-blue-600 text-lg">₹{snack.price * quantity}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOrder}
                  disabled={loading || !selectedStudent}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnackCard;
