import { useNavigate } from "react-router-dom";
import type { Student } from "../../models/index.js";
import StudentSkeleton from "./StudentSkeleton.js";

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  tableHeaders: { label: string; align: string }[];
}

const StudentTable = ({ students, loading, tableHeaders }: StudentTableProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.label}
                  className={`px-3 md:px-6 py-3 md:py-4 text-${header.align} font-bold text-sm md:text-base`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <StudentSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-6xl mb-4">👥</div>
        <p className="text-xl text-gray-600 mb-4">No students registered yet</p>
        <a href="/create" className="text-blue-600 font-semibold hover:underline">
          Create the first account →
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden text-sm md:text-base">
        <thead className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
          <tr>
            <th className="px-3 md:px-6 py-3 md:py-4 text-left font-bold">
              Student Name
            </th>
            <th className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-left font-bold">
              Referral Code
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4 text-right font-bold">
              Total Spent
            </th>
            <th className="px-3 md:px-6 py-3 md:py-4 text-right font-bold">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((s: Student, index: number) => (
            <tr
              key={s.id}
              className={`hover:bg-blue-50 transition ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {/* Student Name */}
              <td className="px-3 md:px-6 py-3 md:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-600 text-sm md:text-base shrink-0">
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 truncate">
                      {s.name}
                    </p>
                    {/* Show referral code on mobile below name */}
                    <p className="sm:hidden text-xs text-gray-600 font-mono bg-gray-200 px-2 py-1 rounded w-fit mt-1">
                      {s.referralCode}
                    </p>
                  </div>
                </div>
              </td>

              {/* Referral Code - Hidden on mobile */}
              <td className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4">
                <code className="bg-gray-200 px-2 md:px-3 py-1 rounded text-xs md:text-sm font-mono text-gray-700 block w-fit">
                  {s.referralCode}
                </code>
              </td>

              {/* Total Spent */}
              <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                <span className="font-bold text-green-600 text-sm md:text-lg">
                  ₹{s.spent}
                </span>
              </td>

              {/* Action Button */}
              <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                <button
                  onClick={() => navigate(`/student/${s.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 md:py-2 px-2 md:px-4 rounded text-xs md:text-base transition transform hover:scale-105 cursor-pointer shadow-md disabled:opacity-50 whitespace-nowrap"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;