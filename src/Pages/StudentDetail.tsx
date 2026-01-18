import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, getStudentOrders, getSnacks } from "../api/canteenApi.js";
import type { Student, Order, Snack } from "../models/index.js";
import {
  StudentInfoCard,
  StudentStatsCard,
  OrderHistorySection,
  StudentDetailSkeleton,
} from "../components/studentDetail/index.js";

const StudentDetail = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) {
      navigate("/students");
      return;
    }

    setLoading(true);
    Promise.all([getStudentById(studentId), getStudentOrders(studentId), getSnacks()])
      .then(([studentData, ordersData, snacksData]) => {
        setStudent(studentData);

        // Populate missing snack details in orders
        const enrichedOrders = ordersData.map((order) => ({
          ...order,
          items: order.items.map((item) => {
            if (!item.snackName) {
              const snack = snacksData.find((s) => s.id === item.snackId);
              return {
                ...item,
                snackName: snack?.name || "Unknown Snack",
                price: item.price || snack?.price || 0,
                subtotal: item.subtotal || item.quantity * (snack?.price || 0),
              };
            }
            return item;
          }),
          totalAmount:
            order.totalAmount ||
            order.items.reduce((sum, item) => {
              const price = item.price || snacksData.find((s) => s.id === item.snackId)?.price || 0;
              return sum + item.quantity * price;
            }, 0),
        }));

        setOrders(enrichedOrders);
      })
      .catch((error) => {
        console.error("Error loading student details:", error);
        alert("Error loading student details");
        navigate("/students");
      })
      .finally(() => setLoading(false));
  }, [studentId, navigate]);

  if (loading) {
    return <StudentDetailSkeleton />;
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl text-gray-600">Student not found</p>
          <button
            onClick={() => navigate("/students")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header with Back Button */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            onClick={() => navigate("/students")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition w-fit text-sm md:text-base"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Student Details</h1>
            <p className="text-base md:text-lg text-gray-600">Order history and information</p>
          </div>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StudentInfoCard student={student} />
            <StudentStatsCard orders={orders} />
          </div>
        </div>

        {/* Orders Section */}
        <OrderHistorySection orders={orders} />
      </div>
    </div>
  );
};

export default StudentDetail;