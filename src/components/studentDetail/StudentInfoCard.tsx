import type { Student } from "../../models/index.js";

interface StudentInfoCardProps {
  student: Student;
}

const StudentInfoCard = ({ student }: StudentInfoCardProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Information</h2>
      <div className="space-y-4">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center font-bold text-2xl text-blue-600 shrink-0">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{student.name}</p>
            <p className="text-sm md:text-base text-gray-600">ID: {student.id}</p>
          </div>
        </div>

        {/* Info Items */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Referral Code</p>
          <p className="text-base md:text-lg font-bold text-gray-900 break-all">
            {student.referralCode || "N/A"}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Total Orders</p>
          <p className="text-base md:text-lg font-bold text-gray-900">{student.totalOrders || 0}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Total Spent</p>
          <p className="text-xl md:text-2xl font-bold text-green-600">
            ₹{student.spent?.toLocaleString() || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;