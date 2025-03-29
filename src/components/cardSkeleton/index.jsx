import React from "react";

const CardSkeleton = () => {
  return (
    <div className="border w-full border-gray-300 rounded-lg text-center shadow-md bg-black flex flex-col animate-pulse">
      <div className="flex-3 bg-gray-700 w-full h-40 rounded-t-lg"></div>

      <div className="flex-2 flex flex-col justify-between p-4 text-white">
        <div>
          <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-500 rounded w-1/3"></div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="h-8 bg-gray-600 rounded w-full"></div>
        </div>

        <div className="flex justify-center space-x-4 mt-3 border-t border-gray-700 pt-2">
          <div className="h-6 bg-gray-600 rounded w-1/4"></div>
          <div className="h-6 bg-gray-600 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
