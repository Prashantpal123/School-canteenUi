import type { Student } from "../../models/index.js";

interface StudentsSummaryProps {
  students: Student[];
}

const StudentsSummary = ({ students }: StudentsSummaryProps) => {
  const totalSpent = students.reduce((sum: number, s: Student) => sum + (s.spent || 0), 0);
  const averageSpent = students.length > 0 ? Math.round(totalSpent / students.length) : 0;

  return (
    <div className="mt-8 md:mt-12 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-4 md:p-8 border-l-4 border-blue-600 shadow-md">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">📊 Students Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Total Students Card */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition">
          <p className="text-gray-600 text-sm md:text-base mb-2">Total Students</p>
          <p className="text-3xl md:text-4xl font-bold text-blue-600">{students.length}</p>
        </div>

        {/* Total Spent Card */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition">
          <p className="text-gray-600 text-sm md:text-base mb-2">Total Spent</p>
          <p className="text-3xl md:text-4xl font-bold text-green-600">₹{totalSpent.toLocaleString()}</p>
        </div>

        {/* Average Spent Card */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition">
          <p className="text-gray-600 text-sm md:text-base mb-2">Average Spent</p>
          <p className="text-3xl md:text-4xl font-bold text-purple-600">₹{averageSpent.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentsSummary;