const StudentSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-300 rounded w-24"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-300 rounded w-16 ml-auto"></div>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="h-10 bg-gray-300 rounded w-24 ml-auto"></div>
    </td>
  </tr>
);

export default StudentSkeleton;