const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-6 w-24 bg-gray-200 rounded mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Skeleton */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="w-full h-80 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Profile Details Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j}>
                      <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                      <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
