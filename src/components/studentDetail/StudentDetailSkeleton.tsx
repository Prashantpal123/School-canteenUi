const StudentDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="flex-1">
            <div className="h-10 w-64 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
            <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Student Info Card Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side */}
            <div>
              <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
                <div className="h-20 bg-gray-200 rounded-lg"></div>
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
            {/* Right side */}
            <div>
              <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-24 bg-gray-200 rounded-lg"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
                <div className="h-12 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
          <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>
                <div className="h-32 w-full bg-gray-100 rounded mb-4"></div>
                <div className="h-12 w-48 bg-gray-200 rounded ml-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailSkeleton;