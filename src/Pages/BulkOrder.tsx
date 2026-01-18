import { useEffect, useState } from "react";
import { getSnacks, getStudents, createStudent as createStudentApi } from "../api/canteenApi.js";
import { useOrder } from "../context/OrderContext.js";
import type { Snack, Student, OrderItem, CreateStudentData } from "../models/index.js";

interface SelectedSnack {
  snack: Snack;
  quantity: number;
}

const BulkOrder = () => {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<SelectedSnack[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [creatingStudent, setCreatingStudent] = useState(false);
  const { placeOrder } = useOrder();

  useEffect(() => {
    // Load snacks and students
    Promise.all([getSnacks(), getStudents()])
      .then(([snacksData, studentsData]) => {
        setSnacks(snacksData);
        setStudents(studentsData);
        if (studentsData.length > 0) {
          setSelectedStudent(studentsData[0]?.id ?? "");
        }
      })
      .finally(() => setPageLoading(false));
  }, []);

  const addSnack = (snack: Snack) => {
    setSelectedSnacks((prev) => {
      const existing = prev.find((s) => s.snack.id === snack.id);
      if (existing) {
        return prev.map((s) =>
          s.snack.id === snack.id ? { ...s, quantity: s.quantity + 1 } : s
        );
      }
      return [...prev, { snack, quantity: 1 }];
    });
  };

  const removeSnack = (snackId: string) => {
    setSelectedSnacks((prev) =>
      prev.filter((s) => s.snack.id !== snackId)
    );
  };

  const updateQuantity = (snackId: string, quantity: number) => {
    if (quantity <= 0) {
      removeSnack(snackId);
      return;
    }
    setSelectedSnacks((prev) =>
      prev.map((s) =>
        s.snack.id === snackId ? { ...s, quantity } : s
      )
    );
  };

  const totalAmount = selectedSnacks.reduce(
    (sum, item) => sum + item.snack.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!selectedStudent) {
      alert("Please select a student");
      return;
    }

    if (selectedSnacks.length === 0) {
      alert("Please select at least one snack");
      return;
    }

    setLoading(true);
    try {
      const student = students.find((s) => s.id === selectedStudent);
      if (!student) {
        alert("Student not found");
        return;
      }

      // Create order items
      const orderItems: OrderItem[] = selectedSnacks.map((item) => ({
        snackId: item.snack.id,
        snackName: item.snack.name,
        quantity: item.quantity,
        price: item.snack.price,
        subtotal: item.snack.price * item.quantity,
      }));

      // Place order
      await placeOrder(selectedStudent, student.name || "Student", orderItems);

      // Reset
      setSelectedSnacks([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async () => {
    if (!newStudentName.trim()) {
      alert("Please enter student name");
      return;
    }

    setCreatingStudent(true);
    try {
      const studentData: CreateStudentData = {
        name: newStudentName.trim(),
      };

      const newStudent = await createStudentApi(studentData);
      
      // Add new student to list
      setStudents((prev) => [...prev, newStudent]);
      
      // Select the new student
      setSelectedStudent(newStudent.id);
      
      // Reset form
      setNewStudentName("");
      setShowCreateDialog(false);
      alert("Student created successfully!");
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Error creating student. Please try again.");
    } finally {
      setCreatingStudent(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bulk Order</h1>
          <p className="text-lg text-gray-600">
            Select multiple snacks and create one order
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Snacks Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Available Snacks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {snacks.map((snack) => {
                  const isAdded = selectedSnacks.some((s) => s.snack.id === snack.id);
                  return (
                    <div
                      key={snack.id}
                      className={`border rounded-lg p-4 transition ${
                        isAdded
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-blue-500"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {snack.name}
                          </h3>
                          <p className="text-blue-600 font-bold">₹{snack.price}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                          VEG
                        </span>
                      </div>
                      <button
                        onClick={() => addSnack(snack)}
                        className={`w-full font-semibold py-2 rounded-lg transition ${
                          isAdded
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {isAdded ? "✓ Added" : "+ Add"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Student Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Select Student
                  </label>
                  <button
                    onClick={() => setShowCreateDialog(true)}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition"
                  >
                    + Create
                  </button>
                </div>
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

              {/* Selected Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Selected Items ({selectedSnacks.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedSnacks.length === 0 ? (
                    <p className="text-gray-500 text-sm">No snacks selected</p>
                  ) : (
                    selectedSnacks.map((item) => (
                      <div
                        key={item.snack.id}
                        className="bg-gray-50 rounded-lg p-3 flex justify-between items-center"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">
                            {item.snack.name}
                          </p>
                          <p className="text-gray-600 text-xs">
                            ₹{item.snack.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.snack.id, item.quantity - 1)
                            }
                            className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-2 py-1 rounded text-xs"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.snack.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-10 text-center border border-gray-300 rounded py-1 px-1 text-xs"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.snack.id, item.quantity + 1)
                            }
                            className="bg-green-100 hover:bg-green-200 text-green-700 font-bold px-2 py-1 rounded text-xs"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeSnack(item.snack.id)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold px-2 py-1 rounded text-xs ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handlePlaceOrder}
                  disabled={
                    loading ||
                    selectedSnacks.length === 0 ||
                    !selectedStudent
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
                <button
                  onClick={() => setSelectedSnacks([])}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Student Dialog */}
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-sm">
              {/* Header */}
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Create New Student
              </h2>

              {/* Student Name Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Enter student name"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateStudent();
                    }
                  }}
                />
              </div>

              {/* Referral Code Info */}
              <div className="bg-blue-50 rounded-lg p-3 mb-6 border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Referral Code:</span> Auto-generated on creation
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateDialog(false);
                    setNewStudentName("");
                  }}
                  disabled={creatingStudent}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateStudent}
                  disabled={creatingStudent || !newStudentName.trim()}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingStudent ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOrder;
